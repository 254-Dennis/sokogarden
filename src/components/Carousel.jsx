import React from 'react'

const Carousel = () => {
  return (
          <section class="row">
            <div class="col-md-12">
                {/* <!-- a division with carousel content  --> */}
                <div class="carousel slide" data-bs-ride="carousel" id="mycarousel">
                    {/* <!-- inner division  --> */}
                    <div class="carousel-inner">
                        {/* <!-- division with image one  --> */}
                        <div class="carousel-item active">
                            <img src="/images/download (15).jpeg" alt="slide1" style={{height:"300px", width:"1000px"}}/>
                        </div>
                        {/* <!-- division with image two  --> */}
                        <div class="carousel-item">
                            <img src="/images/images.jpeg" alt="slide2" style={{height:"300px", width:"1000px"}}/>
                        </div>
                        {/* <!-- division with image three  --> */}
                        <div class="carousel-item">
                            <img src="/images/download.jpeg" alt="slide3" style={{height:"300px", width:"1000px"}}/>
                        </div>
                        {/* <!-- division with image four  --> */}
                        <div class="carousel-item">
                            <img src="/images/images (1).jpeg" alt="slide4" style={{height:"300px", width:"1000px"}}/>
                        </div>
                    </div>
                    {/* <!-- previous control  --> */}
                    <a href="#mycarousel" data-bs-slide="prev" class="carousel-control-prev">
                        <span class="carousel-control-prev-icon bg-success"></span>
                    </a>
                    {/* <!-- next control  --> */}
                    <a href="#mycarousel" data-bs-slide="next" class="carousel-control-next">
                        <span class="carousel-control-next-icon bg-success"></span>
                    </a>
                </div>
            </div>
        </section>
  )
}

export default Carousel