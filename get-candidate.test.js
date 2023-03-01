const crypto = require('crypto');
const old = require('./get-candidate.old');
const refactored = require('./get-candidate');

test('empty event should return trivial partition key as a candidate', () => {
    expect(old.deterministicPartitionKey()).toBe('0');
    expect(refactored.getCandidate()).toBe('0');
})

test('event partition key present should return partition key as a candidate', () => {
    expect(old.deterministicPartitionKey(
        {
            partitionKey: 'some_part_key'
        }
    )).toBe('some_part_key');

    expect(refactored.getCandidate(
        {
            partitionKey: 'some_part_key'
        }
    )).toBe('some_part_key');
})

test('event partition key is not present shoud return hash of event as a candidate', () => {
    const event = {
        name: 'some_value'
    };
    
    const eventHash = crypto.createHash('sha3-512').update(JSON.stringify(event)).digest('hex');

    expect(old.deterministicPartitionKey(event)).toBe(eventHash);

    expect(refactored.getCandidate(event)).toBe(eventHash);
})

test('event partition key is an object shoud return object as JSON string', () => {
    const event = {
        partitionKey: {
            name: 'some_value'
        }
    };

    const stringifiedObject = JSON.stringify(event.partitionKey);
    
    expect(old.deterministicPartitionKey(event)).toBe(stringifiedObject);
    expect(refactored.getCandidate(event)).toBe(stringifiedObject);
})

test('event partition key length greater than configured should return hash', () => {
    const event = {
        partitionKey: {
            name: 'some_value',
            engine: 'some_engine',
            defaultValue: 'some_default_value',
            someBigProperty: 'some_big_value_for_big_property',
            name1: 'some_value',
            engine1: 'some_engine',
            defaultValue1: 'some_default_value',
            someBigProperty1: 'some_big_value_for_big_property'
        }
    };

    const result = crypto.createHash('sha3-512').update(JSON.stringify(event.partitionKey)).digest('hex')

    expect(old.deterministicPartitionKey(event)).toBe(result);
    expect(refactored.getCandidate(event)).toBe(result);
})