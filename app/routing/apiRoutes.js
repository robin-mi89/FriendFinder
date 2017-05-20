// you aren't actually using the path module in this file so there's no need to require it
// var path = require('path');
var friends = require("../data/friends.js");
    // A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
    // A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

module.exports = function(app)
{
    app.get("/api/friends", function(req, res)
    {
        return res.json(friends);
    });

    app.post("/api/friends", function(req, res)
    {
        var newFriend = req.body;
        var compatibleFriend; //will store most compatible score
        var bestFriendScore; //stores the lowest friend score. 
        friends.friends.forEach(function(currentFriend)
        {
            var friendScore = 0;
            // I'd suggest also using `.forEach` to loop through the new friend's scores for the sake of consistency
            for (i = 0; i < newFriend.scores.length; i++) //loops through all the scores of a friend. 
            {
                friendScore += Math.abs(newFriend.scores[i] - currentFriend.scores[i]); //adds the absolute value of new friendscore - currently compared to friend's score. 
            }
            if (compatibleFriend === undefined) //if there is no compatible friend assigned, the current friend is assigned and that Friend's score is the bestScore
            {
                compatibleFriend = currentFriend;
                bestFriendScore = friendScore;
            }
            else //only assign currentFriend to compatibleFriend if their friendScore is lower than the current bestFriendScore
            {
                if (friendScore < bestFriendScore)
                {
                    compatibleFriend = currentFriend;
                    bestFriendScore = friendScore;
                }
            }
        });

        friends.friends.push(req.body); //add friend from body of the request to list of friends.
        return res.json(compatibleFriend);  //returns JSON of most compatible friend. 
    });

    
}
