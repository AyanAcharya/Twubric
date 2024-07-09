export function getFriendsColor(value) {
    if (value > 1.4) {
      return "high";
    } else if (value > 0.6) {
      return "average";
    } else {
      return "low";
    }
  }

  export function getCripnessInfluenceColor(value) {
    if (value > 2.5) {
      return "high";
    } else if (value > 1.6) {
      return "average";
    } else {
      return "low";
    }
  }
  export function getTotalTwubricColor(value) {
    if (value > 7.4) {
      return "high";
    } else if (value > 3.6) {
      return "average";
    } else {
      return "low";
    }
  }
  
  export function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}


export const filterUsersByDate = (users,startDate,endDate) => {
  if (!startDate || !endDate) return users;

  const start = new Date(startDate).getTime() / 1000; 
  const end = new Date(endDate).getTime() / 1000; 
  // console.log(start,end);

  return users.filter(user => {
    const userJoinDate = user.join_date;
    return userJoinDate >= start && userJoinDate <= end;
  });
};

