# coderbyte-test

#### Ticket Breakdown

1. Create a ticket for an investigation of how data stored and the relationship of the data in DB
2. Create ticket to investigate the internals of how Facilities work and how clients are interacting with our system
3. Agent has a metadata stored already in DB we can add another property to the metadata to store some custom ID. This way we can filter by custom ID on our reports while generating them with generateReport function. This is one of the possible solutions
4. Organize a meeting with the team to discuss possible solution and understanding tradeoffs
5. Creating ticket with abstract implementation details which can help in solving problem
6. All of the ticket are candidates for grooming (if in agile env.)
7. Depending on our estimation strategy and who will be responsible to take the ticket (capabilities vary) estimate it


#### Refactoring Solution

**get-candidate.old.js** - Initial code  
**get-candidate.js** - Refactored code. Contains comments about refactoring   
**get-candidate.test.js** - Contains tests for both (old and refactored code to compare them side by side)
