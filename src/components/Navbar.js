import React from 'react';
import { Link } from 'react-router-dom'
 const Navbar = ()=>{
    return(
        <nav>
        <div class="nav-wrapper">
          <form>
            <div class="input-field">
              <input id="search" type="search" required/>
              <label class="label-icon" for="search"><i class="material-icons">search</i></label>
              <i class="material-icons">close</i>
            </div>
          </form>
        </div>
      </nav>
   
        
    )
}

export default Navbar;