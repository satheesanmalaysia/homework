// TopBar.js
import React from "react";
import styled from "styled-components";
import { CheckCircleTwoTone } from "@ant-design/icons";
const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background-color: white;
  color: black;
  border-bottom: 2px solid grey;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 40px;
  margin-right: 10px;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
`;

const ProfilePic = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ProfileName = styled.div`
  font-weight: bold;
`;

const ProfileRole = styled.div`
  font-size: 0.8em;
  color: #ccc;
`;

const TopBar = ({
  logoSrc,
  logoText,
  profilePicSrc,
  profileName,
  profileRole,
}) => {
  return (
    <TopBarContainer>
      <LogoSection>
        <Logo src={logoSrc} alt="logo" />
        <div>{logoText}</div>
      </LogoSection>
      <ProfileSection>
        <CheckCircleTwoTone
          style={{ margin: "3px", width: "15px", height: "15px" }}
          twoToneColor="green"
        />
        <ProfilePic src={profilePicSrc} alt="profile" />
        <ProfileInfo>
          <ProfileName>{profileName}</ProfileName>
          <ProfileRole>Teacher</ProfileRole>
        </ProfileInfo>
      </ProfileSection>
    </TopBarContainer>
  );
};

export default TopBar;
