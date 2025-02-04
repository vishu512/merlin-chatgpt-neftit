const { BrowserRouter, Routes, Route } = ReactRouterDOM;

function HomePage() {
  return React.createElement('div', null, 
    React.createElement('h1', null, 'NetFit Platform'),
    React.createElement('button', null, 'Connect Wallet')
  );
}

function ProfilePage() {
  return React.createElement('div', null, 
    React.createElement('h1', null, 'User Profile')
  );
}

function App() {
  return React.createElement(BrowserRouter, null, 
    React.createElement(Routes, null,
      React.createElement(Route, { path: "/", element: React.createElement(HomePage) }),
      React.createElement(Route, { path: "/profile", element: React.createElement(ProfilePage) })
    )
  );
}

ReactDOM.render(
  React.createElement(App),
  document.getElementById('root')
);
