import {
  addDoc,
  doc,
  getFirestore,
  setDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';

class MessageRepository {
  constructor(app) {
    this.firestore_db = getFirestore(app);
  }
  syncMessage(roomId, onUpdate) {
    // const ref = collection(this.firestore_db, `dm/${roomId}/messages`);
    console.log('syncMessage!!');
    const ref = collection(this.firestore_db, `dm/chatroom/messages`);
    const q = query(ref, orderBy('time', 'asc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        content: doc.data().content,
        time: doc.data().time,
        userId: doc.data().userId,
      }));
      console.log('data:', data);
      data && onUpdate(data);
    });

    return () => unsub();
  }
  initMessage(room) {
    // setDoc(doc(this.firestore_db, `rooms/${room.roomId}/messages`, 'init'), {
    //   content: 'init completed!',
    // });
    setDoc(doc(this.firestore_db, `dm/chatroom/messages`, 'init'), {
      content: 'init completed!',
    });
    console.log('init message runing!');
  }
  saveMessage(message) {
    // addDoc(collection(this.firestore_db, `rooms/${message.roomId}/messages`), {
    //   userId: message.userId,
    //   displayName: message.displayName,
    //   content: message.content,
    //   photoURL: message.photoURL,
    //   time: serverTimestamp(),
    // });
    addDoc(collection(this.firestore_db, `dm/${message.roomId}/messages`), {
      userId: message.userId,
      displayName: message.displayName,
      content: message.content,
      photoURL: message.photoURL,
      time: serverTimestamp(),
    });
  }
}

export default MessageRepository;
