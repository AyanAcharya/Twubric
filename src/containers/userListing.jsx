import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './redux/action/twubricActions.js';
import UserComponent from './userComponent.jsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { filterUsersByDate } from './utils/userFunctions.js';
import "../App.css";

function UserListing() {
  const users = useSelector((state) => state.allUsers.users);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleClearDates = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const handleSortChange = (field) => {
    if (field === sortBy) {
      if (sortOrder === 'asc') {
        setSortOrder('desc');
      } else if (sortOrder === 'desc') {
        setSortBy(null);
        setSortOrder('asc');
      } else {
        setSortOrder('asc');
      }
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const sortedUsers = [...users];

  if (sortBy) {
    sortedUsers.sort((a, b) => {
      const aValue = a.twubric[sortBy];
      const bValue = b.twubric[sortBy];
      if (sortOrder === 'asc') {
        return aValue - bValue;
      } else if (sortOrder === 'desc') {
        return bValue - aValue;
      } else {
        return 0;
      }
    });
  }

  const filteredUsers = filterUsersByDate(sortedUsers, startDate, endDate);

  const renderSortButton = (field, label) => {
    let buttonClass = 'sort-button default';
    let arrow = '';
  
    if (field === sortBy) {
      if (sortOrder === 'asc') {
        buttonClass = 'sort-button asc';
        arrow = '↓';
      } else if (sortOrder === 'desc') {
        buttonClass = 'sort-button desc';
        arrow = '↑';
      }
    }
  
    return (
      <button className={buttonClass} onClick={() => handleSortChange(field)}>
        {label} <span>{arrow}</span>
      </button>
    );
  };

  return (
    <div>
      <div className="date-picker-container">
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          maxDate={new Date()} 
          endDate={endDate}
          placeholderText="Select start date"
          className="date-picker"
          showYearDropdown
          dropdownMode="select"
          dateFormat="MMM d, yyyy"
        />
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          maxDate={new Date()} 
          placeholderText="Select end date"
          className="date-picker"
          showYearDropdown
          dropdownMode="select"
          dateFormat="MMM d, yyyy"
        />
        <button onClick={handleClearDates} disabled={!startDate && !endDate}>
          Clear
        </button>
      </div>
      <div className="sort-buttons-grid">
        {renderSortButton('chirpiness', 'Chirpiness')}
        {renderSortButton('influence', 'Influence')}
        {renderSortButton('friends', 'Friends')}
        {renderSortButton('total', 'Twubric Score')}
      </div>
      <UserComponent users={filteredUsers} />
    </div>
  );
}

export default UserListing;
