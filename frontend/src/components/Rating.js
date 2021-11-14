

const rating = ({rating})=>{
    return (
    <div className='rating'>
        <span>
            {rating >= 1? 
            <i className="fa fa-star"></i>
            :
            rating >= 0.5 ?  <i className='fa fa-star-half-o'></i> 
            :  <i></i>  
               
            }
        </span>
        <span>
            {rating >= 2? 
            <i className="fa fa-star"></i>
            :
            rating >= 1.5 ?  <i className='fa fa-star-half-o'></i> 
            :    
                <i ></i>
            }
        </span>
        <span>
            {rating >= 3? 
            <i className="fa fa-star"></i>
            :
            rating >= 2.5 ?  <i className='fa fa-star-half-o'></i> 
            :    
                <i></i>
            }
        </span>
        <span>
            {rating >= 4? 
            <i className="fa fa-star"></i>
            :
            rating >= 3.5 ?  <i className='fa fa-star-half-o'></i> 
            :    
                <i></i>
            }
        </span>
        <span>
            {rating >= 5? 
            <i className="fa fa-star"></i>
            :
            rating >= 4.5 ?  <i className='fa fa-star-half-o'></i> 
            :    
                <i ></i>
            }
        </span>
    </div>
    )

}

export default rating ;









































