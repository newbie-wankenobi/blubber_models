var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/blubber_app");


var User = require('./models/User'),
    Thread = require('./models/Thread');
Thread.remove({}, function(err,results){
  User.remove({}, function(err, results){
    User.create([
       {name: "John Marshall", email: "jmarshall@example.com", moderator: true},
       {name: "Oliver Wendell Holmes", email: "owholmes@example.com"},
       {name: "Thurgood Marshall", email: "tmarshall@example.com"},
       {name: "Sandra Day O'Connor", email: "sdoconnr@example.com"}
      ],
      function(err, users){
        if(err) console.log(err);


        var john = users[0],
            thur = users[2];

        // create threads
        Thread.create([{name: "YOLO", creator: john, creatorName: john.name},
                       {name: "What's up New York!", creator: thur, creatorName: thur.name }

          ], function(err, threads){
          if(err) console.log(err);
          // console.log(threads);

          // add posts
          var yolo = threads[0];

          yolo.posts.push({
            author: john,
            title: "Marbury vs Madison",
            body: "Ya digggg?"
          });

          yolo.posts.push({
            author: thur,
            title: "Brown v BoE",
            body: "Right? Yeah."
          });

          yolo.save(function(err, results) {
            mongoose.connection.close();
          });

        });
      }
    );
  });
})
