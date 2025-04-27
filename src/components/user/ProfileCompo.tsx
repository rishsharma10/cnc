import { useContext, useState } from 'react';
import { Button } from 'antd';
import EditUserProfile from './EditUserProfile';
import ViewUserProfile from './ViewUserProfile';
import { GlobalContext } from '@/context/Provider';

const ProfileCompo = () => {
    const {userInfo, setUserInfo} = useContext(GlobalContext)
  const [editing, setEditing] = useState(false);
  const handleSave = (data:any) => {
    debugger
    setUserInfo({
        ...userInfo,
        ...data
    });
    setEditing(false);
  };
  console.log(userInfo,"userinfoooo");
  

  return (
    <div>
      {editing ? (
        <EditUserProfile user={userInfo} onSave={handleSave as any} setEditing={setEditing} />
      ) : (
        <>
          <ViewUserProfile {...userInfo} setEditing={setEditing} />
          
        </>
      )}
    </div>
  );
};

export default ProfileCompo;
