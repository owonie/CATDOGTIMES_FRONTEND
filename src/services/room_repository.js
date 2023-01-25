import {
  doc,
  getFirestore,
  getDoc,
  setDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';

class RoomRepository {
  constructor(app) {
    this.firestore_db = getFirestore(app);
  }
  syncDmList(userId, onUpdate) {
    console.log('userId:', userId);
    console.log('syncRoom!!');
    const ref = collection(this.firestore_db, `dm/${userId}/dmList`);
    const q = query(ref, orderBy('time', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        time: doc.data().time,
        photoURL: doc.data().photoURL,
        roomId: doc.data().roomId,
      }));
      console.log('data:', data);
      data && onUpdate(data);
    });

    return () => unsub();
  }

  saveRoom(userId, room, pfp, memberNickname) {
    console.log('saveRoom!');
    getDoc(doc(this.firestore_db, `dm/${userId}/dmList`, `${room}`)).then(
      (docSnap) => {
        setDoc(
          doc(this.firestore_db, `dm/${userId}/dmList`, `${room}`),
          {
            time: serverTimestamp(),
            roomId: room,
            photoURL: pfp,
            roomName: memberNickname,
          },
          { merge: true }
        );
      }
    );
  }
  getRoom(userId, room, data) {
    getDoc(doc(this.firestore_db, `dm/${userId}/dmList`, `${room}`)).then(
      (docSnap) => {
        if (docSnap.exists()) {
          data(true);
          console.log('room time update');

          setDoc(
            doc(this.firestore_db, `dm/${userId}/dmList`, `${room}`),
            {
              time: serverTimestamp(),
              roomId: room,
            },
            { merge: true }
          );
        } else {
          data(false);
          console.log('no such a room');
        }
      }
    );
  }
}

export default RoomRepository;
