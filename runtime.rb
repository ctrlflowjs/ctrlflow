# get collection of all actions, put in a hash with names as keys
# sort nodes by highest


I basically have a sort of linked list

# associate every node with a promise
# but also, make sure there are no free standing nodes. but also everything depends on input

# create a two way linked list, and whenever you're going to invoke a task, make sure the other is done

# try invoke next, if it is still waiting for an unfinished task, skip
# when running, lookup the action definition by the name id
# invoke the perform() method of the action, storing the result
# need to pass in params, which for now we'll assume are never complex expressions
