
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getFriendsColor, getCripnessInfluenceColor, getTotalTwubricColor, formatDate } from './utils/userFunctions';
import '../App.css';
import no_data from "../assets/no_data.png";

function UserComponent({ users }) {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    setUserList(users);
  }, [users]);

  const handleRemoveUser = (uid) => {
    const updatedList = userList.filter(user => user.uid !== uid);
    setUserList(updatedList);
  };

  if (!userList || userList.length === 0) {
    return (
      <div className='no_data_container'>
        <img src={no_data} alt='No Data Found'/>
      </div>
    );
  }

  const renderList = userList.map((user) => {
    const { uid, username, image, fullname, twubric, join_date } = user;
    const formattedDate = formatDate(join_date);
    const totalTwubricLevel = getTotalTwubricColor(twubric.total);
    const chirpinessLevel = getCripnessInfluenceColor(twubric.chirpiness);
    const friendsLevel = getFriendsColor(twubric.friends);
    const influenceLevel = getCripnessInfluenceColor(twubric.influence);

    return (
      <div className='column' key={uid}>
        <div className='card'>
          <div className={`card__image-container`}>
            <div className={`card__total card__twubric-value--${totalTwubricLevel}`}>{twubric.total}</div>
            <img src={image} alt={username} className='card__image' />
          </div>
          <div className='card__initial-details'>
            <div className='card__status'>{username}</div>
            <div className='card__title'>{fullname}</div>
            <div className='card__status'>{formattedDate}</div>
          </div>
          <div className='card__details'>
            <div className='card__header'>
              <div className='card__status'>{username}</div>
              <div className='card__title'>{fullname}</div>
              <div className='card__status'>{formattedDate}</div>
            </div>
            <div className='card__description'>
              <div className='card__twubric'>
                <div className='card__twubric-item'>
                  <div className={`card__twubric-value card__twubric-value--${chirpinessLevel}`}>{twubric.chirpiness}</div>
                  <p>Chirpiness</p>
                </div>
                <div className='card__twubric-item'>
                  <div className={`card__twubric-value card__twubric-value--${friendsLevel}`}>{twubric.friends}</div>
                  <p>Friends</p>
                </div>
                <div className='card__twubric-item'>
                  <div className={`card__twubric-value card__twubric-value--${influenceLevel}`}>{twubric.influence}</div>
                  <p>Influence</p>
                </div>
                <div className='card__twubric-item'>
                  <div className={`card__twubric-value card__twubric-value--${totalTwubricLevel}`}>{twubric.total}</div>
                  <p>Total ({totalTwubricLevel})</p>
                </div>
              </div>
              <button className='card__remove-button' onClick={() => handleRemoveUser(uid)}>Remove</button>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return <div className='ui grid container'>{renderList}</div>;
}

UserComponent.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      fullname: PropTypes.string.isRequired,
      twubric: PropTypes.shape({
        total: PropTypes.number.isRequired,
        chirpiness: PropTypes.number.isRequired,
        friends: PropTypes.number.isRequired,
        influence: PropTypes.number.isRequired,
      }).isRequired,
      join_date: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default UserComponent;
