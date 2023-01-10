import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

class RoomRepository {
  constructor(app) {
    this.firestore_db = getFirestore(app);
  }
  saveRoom(userId, room) {
    getDoc(doc(this.firestore_db, 'dm', `${room.roomId}`)).then((docSnap) => {
      if (docSnap.exists()) {
      } else {
        setDoc(doc(this.firestore_db, 'dm', `${room.roomId}`), {
          masterId: userId,
          roomId: room.roomId,
        });
      }
    });
  }
  getRoom(room, data) {
    getDoc(doc(this.firestore_db, 'dm', `${room}`)).then((docSnap) => {
      if (docSnap.exists()) {
        data(true);
        console.log('room exists');
      } else {
        data(false);
        console.log('no such a room');
      }
    });
  }
}

export default RoomRepository;
