import React from 'react'

const Footer = () => {
  return (
    <div>
         <section class="row bg-warning p-4">
            {/* <!-- child 1  -->  */}
            <div class="col-md-4 text-white">
                <h2 class="text-center">About us</h2>
                <p>We offer our delivery every where in the country in 24 hours without wasting time.Our offers will
                    start today nation wide.</p>
            </div>
            {/* <!-- child 2  -->  */}
            <div class="col-md-4">
                <h2 class="text-center text-white">Contact us</h2>
                <form action="">
                    <input type="email" placeholder="enter your email" class="form-control"/><br/><br/>
                    <textarea name="" cols="10" rows="7" id="" class="form-control"
                        placeholder="leave a comment"></textarea><br/><br/>
                    <input type="submit" value="send message" class="btn btn-outline-danger"/>
                </form>
            </div>
            {/* <!-- child 3  -->  */}
            <div class="col-md-4">
                <h2 class="text-center text-white">Stay conected</h2>
                <a href="">
                    <img src="images/fb.png" alt="fb"/>
                </a>
                <a href="">
                    <img src="images/in.png" alt="in"/>
                </a>
                <a href="">
                    <img src="images/x.png" alt="x"/>
                </a>
                <p>You can find us in those sociol media because we are always online</p>
            </div>
        </section>
    </div>
  )
}

export default Footer