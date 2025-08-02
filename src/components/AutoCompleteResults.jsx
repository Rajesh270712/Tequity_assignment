export const AutoCompleteResults = ({ users, loading }) => {
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="autocomplete-list-container">
      {users.map((user) => (
        <li className="list-item" key={user.id} onClick={() => {
          window.open(user.html_url, "_blank");
        }} >
          <img className="list-user-img" src={user.avatar_url} alt={user.login} />
          <span>{user.login}</span>
        </li>
      ))}
    </div>
  );
};