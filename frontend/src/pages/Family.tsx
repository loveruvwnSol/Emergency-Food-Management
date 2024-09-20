import React, { useState } from 'react';
import FamilyBoard from '../components/templates/Family/FamilyBoard';
import NoneFamily from '../components/organisms/Family/NoneFamily';

const Family = () => {
  const [familyCheck, setFamilyCheck] = useState(true); //trueで家族ページfalseで家族招待ページ
  return familyCheck ? <FamilyBoard /> : <NoneFamily />;
};

export default Family;
