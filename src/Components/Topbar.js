// TopBar.js
import React from "react";
import styled from "styled-components";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../theme';
import { GlobalStyles } from '../Globalstyle';
import ThemeToggle from '../ThemeToggle';
import { useState, useEffect } from "react";
const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;

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
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
      theme === 'light' ? setTheme('dark') : setTheme('light');
  }
  return (
    <TopBarContainer>
      
      <LogoSection>
      
        <Logo src={logoSrc} alt="logo" />
        
        <div style={{marginRight:'10px'}}> {logoText==='Teacher App' ? <Link to="/teacher">{logoText}</Link> :<Link to="/student">{logoText}</Link>} </div>
       
       
      </LogoSection>

      <ProfileSection>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <GlobalStyles />  Theme  
            <div>
               <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>
        </ThemeProvider>
        <CheckCircleTwoTone
          style={{ margin: "3px", width: "15px", height: "15px" }}
          twoToneColor="green"
        />
         
        <ProfilePic src={profilePicSrc} alt="profile" />
        <ProfileInfo>
          <ProfileName>{profileName}</ProfileName>
          <ProfileRole>Role {profileRole}</ProfileRole>
        </ProfileInfo>
      </ProfileSection>
     
    </TopBarContainer>
  );
};

export default TopBar;
