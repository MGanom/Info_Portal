import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "./Card";
import Editor from "./Editor";
import "./styles/Profile.scss";

const Profile = ({ database }) => {
  const history = useHistory();
  const [profile, setProfile] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (history?.location?.state?.isGuest) {
      const guestSync = database.syncData("guest", (info) => {
        setProfile(info);
      });
      return () => guestSync();
    }
    const stopSync = database.syncData(history?.location?.state?.id, (info) => {
      setProfile(info);
    });
    return () => stopSync();
  });

  const updateProfile = (info) => {
    setProfile(info);
    database.saveData(history?.location?.state?.id, info);
  };

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <section className="profile">
      <Card profile={profile} />
      <button className="profileEditBtn" onClick={toggleEdit}>
        프로필 수정
      </button>
      {history?.location?.state?.isGuest || !isEdit ? null : (
        <Editor profile={profile} updateProfile={updateProfile} />
      )}
    </section>
  );
};

export default Profile;