import {
  addDoc,
  doc,
  getFirestore,
  setDoc,
  getDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';

class RouteRepository {
  constructor(app) {
    this.firestore_db = getFirestore(app);
  }
  syncHistoryRouteList(onUpdate) {
    const ref = collection(this.firestore_db, `route/Dev_Owon/history`);
    const q = query(ref, orderBy('time', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        photoURL: doc.data().photoURL,
        time: doc.data().time,
        routeNo: doc.data().routeNo,
      }));
      console.log('data:', data);
      data && onUpdate(data);
    });

    return () => unsub();
  }
  syncMyRouteList(onUpdate) {
    const ref = collection(this.firestore_db, `route/Dev_Owon/myRoute`);
    const q = query(ref, orderBy('time', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        photoURL: doc.data().photoURL,
        time: doc.data().time,
        routeNo: doc.data().routeNo,
      }));
      console.log('data:', data);
      data && onUpdate(data);
    });
    return () => unsub();
  }

  getRoute(routeNo, data) {
    getDoc(doc(this.firestore_db, 'route/Dev_Owon/history', `${routeNo}`)).then(
      (docSnap) => {
        if (docSnap.exists()) {
          data(true);
          setDoc(
            doc(this.firestore_db, 'route/Dev_Owon/history', `${routeNo}`),
            {
              time: serverTimestamp(),
            },
            { merge: true }
          );
        } else {
          data(false);
          console.log('no such a route');
        }
      }
    );
  }

  getMyRoute(routeNo, data) {
    getDoc(doc(this.firestore_db, 'route/Dev_Owon/myRoute', `${routeNo}`)).then(
      (docSnap) => {
        if (docSnap.exists()) {
          data(true);
          setDoc(
            doc(this.firestore_db, 'route/Dev_Owon/myRoute', `${routeNo}`),
            {
              time: serverTimestamp(),
            },
            { merge: true }
          );
        } else {
          data(false);
          console.log('no such a route');
        }
      }
    );
  }
  getRealRoute(routeNo, data) {
    getDoc(
      doc(this.firestore_db, 'route/Dev_Owon/realRoute', `${routeNo}`)
    ).then((docSnap) => {
      if (docSnap.exists()) {
        data(true);
        setDoc(
          doc(this.firestore_db, 'route/Dev_Owon/realRoute', `${routeNo}`),
          {
            time: serverTimestamp(),
          },
          { merge: true }
        );
      } else {
        data(false);
        console.log('no such a route');
      }
    });
  }

  saveRoute(route, data) {
    // arrow 좌표 매핑 후 저장
    Object.keys(data.arrow).map((key) => {
      addDoc(
        collection(
          this.firestore_db,
          `route/Dev_Owon/${route.type}/${route.name}/arrow`
        ),
        {
          points: data.arrow[key].points,
        }
      );
    });

    // circle 좌표 매핑 후 저장

    Object.keys(data.circle).map((key) => {
      addDoc(
        collection(
          this.firestore_db,
          `route/Dev_Owon/${route.type}/${route.name}/circle`
        ),
        {
          center: data.circle[key].center,
          radius: data.circle[key].radius,
        }
      );
    });

    // marker
    Object.keys(data.marker).map((key) => {
      addDoc(
        collection(
          this.firestore_db,
          `route/Dev_Owon/${route.type}/${route.name}/marker`
        ),
        {
          x: data.marker[key].x,
          y: data.marker[key].y,
        }
      );
    });

    // rectangle
    Object.keys(data.rectangle).map((key) => {
      addDoc(
        collection(
          this.firestore_db,
          `route/Dev_Owon/${route.type}/${route.name}/rectangle`
        ),
        {
          sPoints: data.rectangle[key].sPoint,
          ePoints: data.rectangle[key].ePoint,
        }
      );
    });
    // polygon
    Object.keys(data.polygon).map((key) => {
      addDoc(
        collection(
          this.firestore_db,
          `route/Dev_Owon/${route.type}/${route.name}/polygon`
        ),
        {
          points: data.polygon[key].points,
        }
      );
    });
  }

  saveRealRoute(route, data) {
    addDoc(
      collection(this.firestore_db, `route/Dev_Owon/realRoute/${route.name}`),
      {
        points: data,
      }
    );
  }
}

export default RouteRepository;
