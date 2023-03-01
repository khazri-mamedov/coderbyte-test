const crypto = require("crypto");

/**
 * Exporting valid function because we're getting candidate and function should be named properly
 * Adding check for event and returning from function ASAP
 * Initialize any local variable with default value at least
 * No definition for event object? We can use TypeScript to define it
 * Define constants outside of a function
 * Making partition key length configurable
 * No definition for return. Can be hash or '0'
 * IMPORTANT: we can infinitely refactor it but to refactor it properly we need a little bit more context
 * Can be simplified further with logic change
 */

const DEFAULT_PARTITION_KEY = '0';

/**
 * SHA3-512 hashing function
 * @param {*} valueToHash string value to hash
 * @returns 128 length string
 */
 const getShaHash = valueToHash => {
    return crypto.createHash("sha3-512").update(valueToHash).digest("hex");
}

exports.getCandidate = (event, maxPartitionKeyLength = 256) => {
    if (!event) { 
        console.warn('Event is not present');
        return DEFAULT_PARTITION_KEY;
    }

    let candidate = DEFAULT_PARTITION_KEY;
  
    if (event.partitionKey) {
        candidate = event.partitionKey;
    } else {
        const data = JSON.stringify(event);
        candidate = getShaHash(data);
    }

    if (candidate && typeof candidate !== 'string') {
        candidate = JSON.stringify(candidate);
    }

    if (candidate.length > maxPartitionKeyLength) {
        return getShaHash(candidate);
    }

    return candidate;
};
