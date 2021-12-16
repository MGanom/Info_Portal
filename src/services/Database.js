import { firebaseDatabase } from "./Firebase";

class Database {
  syncData(userId, onUpdate) {
    const ref = firebaseDatabase.ref(`${userId}/info`);
    ref.on("value", (snapshot) => {
      snapshot.val() && onUpdate(snapshot.val());
    });
    return () => ref.off();
  }

  saveData(userId, data) {
    firebaseDatabase.ref(`${userId}/info`).set(data);
  }
  //
  //
  bookmarkId(userId) {
    const ref = firebaseDatabase.ref(`${userId}/bookmark`);
    let id = 0;
    ref.on("value", (snapshot) => {
      if (snapshot.val()) {
        id = Object.keys(snapshot.val()).length + 1;
      } else {
        id = 1;
      }
    });
    return id;
  }

  syncBookmark(userId, onUpdate) {
    const ref = firebaseDatabase.ref(`${userId}/bookmark`);
    ref.on("value", (snapshot) => {
      snapshot.val() && onUpdate(snapshot.val());
      !snapshot.val() && onUpdate({});
    });
    return () => ref.off();
  }

  checkBookmark(userId, id, onCheck) {
    const ref = firebaseDatabase.ref(`${userId}/bookmark/${id}`);
    ref.once("value", (snapshot) => {
      if (snapshot.val()) {
        onCheck(true);
      } else {
        onCheck(false);
      }
    });
  }

  saveBookmark(userId, data) {
    firebaseDatabase.ref(`${userId}/bookmark/${data.id}`).set(data);
  }

  removeBookmark(userId, id) {
    firebaseDatabase.ref(`${userId}/bookmark/${id}`).remove();
  }

  reportId() {
    const ref = firebaseDatabase.ref(`report`);
    let id = 0;
    ref.on("value", (snapshot) => {
      if (snapshot.val()) {
        id = Object.keys(snapshot.val()).length + 1;
      } else {
        id = 1;
      }
    });
    return id;
  }

  reporterNick(userId, setNick) {
    const ref = firebaseDatabase.ref(`${userId}`);
    ref.on("value", (snapshot) => {
      if (snapshot.val()) {
        setNick(snapshot.val().info.name);
      }
    });
  }

  saveReport(data, id) {
    firebaseDatabase.ref(`report/${id}`).set(data);
  }

  syncGuestBook(onUpdate) {
    const ref = firebaseDatabase.ref("guestbook");
    ref.on("value", (snapshot) => {
      snapshot.val() && onUpdate(snapshot.val());
    });
    return () => ref.off();
  }

  signId() {
    const ref = firebaseDatabase.ref(`guestbook`);
    let id = 0;
    ref.on("value", (snapshot) => {
      if (snapshot.val()) {
        id = snapshot.val()[snapshot.val().length - 1].id + 1;
      } else {
        id = 1;
      }
    });
    return id;
  }

  saveSign(id, data) {
    firebaseDatabase.ref(`guestbook/${id}`).set(data);
    firebaseDatabase.ref(`guestbookDB/${id}`).set(data);
  }

  removeSign(userId, id) {
    firebaseDatabase.ref(`guestbook`).remove();
  }
}

export default Database;
