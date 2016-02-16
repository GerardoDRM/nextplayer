/**
 * app.js
 *
 * Front-end code and event handling for sailsChat
 *
 */

// 
// // Attach a listener which fires when a connection is established:
// io.socket.on('connect', function socketConnected() {
//
//   if($("#userId").val() != "") {
//     io.socket.get("/user/subscription/" + $("#userId").val() , function(data){
//       console.log(data);
//     });
//   }
//
//   // Listen for the "user" event, which will be broadcast when something
//   // happens to a user we're subscribed to.  See the "autosubscribe" attribute
//   // of the User model to see which messages will be broadcast by default
//   // to subscribed sockets.
//   io.socket.on('user', function messageReceived(message) {
//     switch (message.verb) {
//       // Handle private messages.
//       case 'messaged':
//         console.log(message.data);
//         break;
//       default:
//         break;
//     }
//
//   });
//
//   console.log('Socket is now connected!');
//   // When the socket disconnects, hide the UI until we reconnect.
//   io.socket.on('disconnect', function() {});
// });
