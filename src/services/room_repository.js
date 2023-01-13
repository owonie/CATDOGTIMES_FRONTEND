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
  syncDmList(onUpdate) {
    // const ref = collection(this.firestore_db, `dm/${roomId}/messages`);
    console.log('syncRoom!!');
    const ref = collection(this.firestore_db, `dm/Dev_Owon/dmList`);
    const q = query(ref, orderBy('time', 'desc'));
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

  saveRoom(userId, room) {
    getDoc(doc(this.firestore_db, 'dm/Dev_Owon/dmList', `${room.roomId}`)).then(
      (docSnap) => {
        setDoc(
          doc(this.firestore_db, 'dm/Dev_Owon/dmList', `${room.roomId}`),
          {
            time: serverTimestamp(),
            roomId: room.roomId,
          },
          { merge: true }
        );
      }
    );
  }
  getRoom(room, data) {
    getDoc(doc(this.firestore_db, 'dm/Dev_Owon/dmList', `${room}`)).then(
      (docSnap) => {
        if (docSnap.exists()) {
          data(true);
          console.log('room time update');

          setDoc(
            doc(this.firestore_db, 'dm/Dev_Owon/dmList', `${room}`),
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
