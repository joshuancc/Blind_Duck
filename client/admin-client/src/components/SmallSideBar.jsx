
const SmallSidebar = () => {
  return (
    <div className="container">
      <div className="phone">
        <div className="content">
          <nav role="navigation">
            <div id="menuToggle">
              <input type="checkbox" />
              <span></span>
              <span></span>
              <span></span>
              <ul id="menu">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Info</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SmallSidebar;
