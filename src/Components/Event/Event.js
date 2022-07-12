
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import "../Event/Event.styles.css"
import styled from "styled-components"
import { postApiCall,deleteApiCall } from '../../utils/functions'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { LoadingBox } from '../../StyledComponents/Components.js'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Event = ({name,host,eventID,isOwner,deleteEventUpdate,img,setIsActive,active}) => {


	const [showLoading,setShowLoading] = useState(false);
	const [showModal,setShowModal] = useState(false);
	const [showMore,setShowMore] = useState(false);

  const handleJoinEvent = async () => {
    postApiCall(`https://eventfuloflies.herokuapp.com/joinEvent`,{eventID})
    .then((res) => {
      console.log(res)
    })
  }

  const ViewStyle = {
    color:'white',
    backgroundColor:'black',
    textDecoration:'none',
    borderRadius:5,
    padding: 5
  }

  const handleDelete = ()  => {
    setShowLoading(true)
    deleteApiCall(`https://eventfuloflies.herokuapp.com/event/${eventID}`)
    .then((res) => {
      setShowLoading(false)
      deleteEventUpdate(res.events)
    })
  }

  const handleHover = () => {
    setShowModal(true);
  }

  const handleLeave = () => {
    setShowModal(false);
  }

  return (
    <EventContainer image={img} onClick={(e) => e.stopPropagation()}>
        
        {showLoading && <LoadingBox>
        	<CircularProgress />
        </LoadingBox>}


        
        
        <InfoContainer>
          <Title>{name}</Title>
          <Title>Hosted by {host}</Title>
        </InfoContainer>
        
        <div className='more-container'>
			<ExpandMoreIcon className='more-icon' onClick={() => {
				if(active != eventID) {
					setShowMore(true)
				}else {
					setShowMore(!showMore)
				}
				setIsActive(eventID)
			
			}}/>
		
			<div className={active === eventID && showMore ? 'more-options show-more' : "more-options"}>
				<button className='more-button'>View</button>
				<button className='more-button'>Leave</button>
			</div>
        </div>

    </EventContainer>
  )
}

const EventContainer = styled.div `
  background-image: url(${props => props.image});
  width:150px;
  height:150px;
  background-size: 100% 100%;
  background-repeat:no-repeat;
  border-radius:5px;
  background-position:center;
  position:relative;
  
  > div {
    padding:5px;
  }
  
 
  border:2px solid black;
`;



const HoverModal = styled.div `
  position:absolute;
  background-color:black;
  width:100%;
  height: 40px;
  color:white;
  margin-top:5px;
  border-radius:5px;
  display:flex;
  align-items:center;
  justify-content:center;
  animation: fadeIn .2s linear;
  @keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;;
  }
}


`

const DeleteEventButton = styled.button `
  cursor:pointer;
  background-color:red;
  border-top-left-radius:5px;
  border-top-right-radius:5px;
 
  
  

  :hover {
    background-color:darkred;
  }


`


const InfoContainer = styled.div `
  margin-top: 3px;
  flex-grow:1;
  position:absolute;

`;


const Title = styled.p `


`

const JoinButton = styled.button `
  color:white;
  background-color:black;
  border:none;
  padding:5px;
  border-radius:5px;
  cursor:pointer;
  font-style:bold;

`

const ButtonWrapper = styled.div `
  display:inline-flex;
  width:100%;
  justify-content:space-between;
  
  
  

`

export default Event