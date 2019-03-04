import {Provider}  from 'react-redux'
import ReduxToastr from 'react-redux-toastr'
 
<Provider store={store}>
  <div>
    ... other things like router ...
    // props are not required
    <ReduxToastr
      timeOut={4000}
      newestOnTop={false}
      preventDuplicates
      position="top-left"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick/>
  </div>
</Provider>