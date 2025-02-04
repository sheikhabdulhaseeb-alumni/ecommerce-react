const Error = () => {
  return (
    <div className="error-page" style={{backgroundColor: 'lightgrey', padding: '20px', border: '1px solid black', borderRadius: '5px'}}>
      <h1 style={{color: 'red'}}>Oops!</h1>
      <p style={{fontSize: '16px'}}>Something went wrong - 404</p>
      <p style={{fontSize: '14px'}}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <button style={{backgroundColor: 'red', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '3px'}} onClick={() => window.history.back()}>Go back</button>
    </div>
  )
}

export default Error

