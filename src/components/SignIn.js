
import React, { useState } from 'react';
import { auth, db } from '../firebase/firebaseConfig'; // Update this path
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, arrayUnion } from 'firebase/firestore';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sosNumber, setSosNumber] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const provider = new GoogleAuthProvider();

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message
    setSuccessMessage(''); // Reset success message

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Retrieve SOS number from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setSuccessMessage(`Logged in successfully as ${user.email}`);
        
        // Save chat history for the user upon sign-in
        await saveChatHistory(user.uid, "Sample chat message"); // Replace with actual chat data
      } else {
        setError('User does not have SOS Number. Please register.');
      }

      // Reset fields after successful sign-in
      setEmail('');
      setPassword('');
      setSosNumber('');

    } catch (error) {
      console.error('Error signing in with email:', error);
      handleFirebaseError(error);
    }
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message
    setSuccessMessage(''); // Reset success message

    if (!sosNumber) {
      setError('SOS Number is required for new users.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save the SOS number to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        sosNumber: sosNumber,
      });

      setSuccessMessage(`Account created successfully for ${user.email}`);
      
      // Save chat history for the new user
      await saveChatHistory(user.uid, "Sample chat message"); // Replace with actual chat data

      // Reset fields after successful sign-up
      setEmail('');
      setPassword('');
      setSosNumber('');
    } catch (error) {
      console.error('Error creating user with email:', error);
      handleFirebaseError(error);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(''); // Reset error message
    setSuccessMessage(''); // Reset success message

    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Check if the user already exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        // If not exists, prompt for SOS number
        setIsNewUser(true);
      } else {
        setSuccessMessage(`Logged in successfully as ${user.email}`);
        
        // Save chat history for the user upon sign-in
        await saveChatHistory(user.uid, "Sample chat message"); // Replace with actual chat data
      }

    } catch (error) {
      console.error('Error signing in with Google:', error);
      handleFirebaseError(error);
    }
  };

  const handleFirebaseError = (error) => {
    switch (error.code) {
      case 'auth/user-not-found':
        setError('No user found with this email. Please register first.');
        break;
      case 'auth/wrong-password':
        setError('Incorrect password. Please try again.');
        break;
      case 'auth/invalid-email':
        setError('Invalid email format. Please enter a valid email.');
        break;
      case 'auth/user-disabled':
        setError('This user account has been disabled.');
        break;
      case 'auth/email-already-in-use':
        setError('This email is already in use. Please log in.');
        break;
      default:
        setError('Error signing in: ' + error.message);
        break;
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    setSuccessMessage('Logged out successfully!');
    setIsNewUser(false);
    setEmail('');
    setPassword('');
    setSosNumber('');
  };

  // Function to store chat history in Firestore
  const saveChatHistory = async (userId, chatMessage) => {
    // Save chat message to Firestore
    try {
      await setDoc(doc(db, 'chats', userId), {
        messages: arrayUnion(chatMessage), // Append chat messages
      }, { merge: true }); // Use merge to update the existing document
      console.log("Chat history saved successfully");
    } catch (error) {
      console.error("Error saving chat history:", error);
    }
  };

  return (
    <div className="p-4">
      {auth.currentUser ? (
        <div>
          <h1 className="text-2xl mb-4">Logged in as: {auth.currentUser.email}</h1>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 mb-4">
            Log Out
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl mb-4">Sign In</h1>
          {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form onSubmit={isNewUser ? handleEmailSignUp : handleEmailSignIn} className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full mb-2"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 w-full mb-2"
              required
            />
            {/* Show SOS Number field only if the user is new */}
            {isNewUser && (
              <input
                type="text"
                placeholder="SOS Number"
                value={sosNumber}
                onChange={(e) => setSosNumber(e.target.value)}
                className="border p-2 w-full mb-2"
                required
              />
            )}
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">
              {isNewUser ? 'Sign Up' : 'Sign In'}
            </button>
          </form>
          <button onClick={handleGoogleSignIn} className="bg-red-500 text-white px-4 py-2 mb-4">
            Sign In with Google
          </button>
          <div>
            <label>
              <input
                type="checkbox"
                checked={isNewUser}
                onChange={() => setIsNewUser(!isNewUser)}
              />
              New User?
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
