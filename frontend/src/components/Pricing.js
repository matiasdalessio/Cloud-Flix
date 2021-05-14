const Pricing = ()=>{
    return(
        <div className="section">
        <div className="container">
            <div className="pricing">
                <div className="pricing-header">
                    Cloud<span className="main-color">Flix</span> pricing
                </div>
                <div className="pricing-list">
                    <div className="row">
                        <div className="col-4 col-md-12 col-sm-12">
                            <div className="pricing-box">
                                <div className="pricing-box-header">
                                    <div className="pricing-name">
                                        Basic
                                    </div>
                                    <div className="pricing-price">
                                        Free
                                    </div>
                                </div>
                                <div className="pricing-box-content">
                                    <p>Originals</p>
                                    <p>Swich plans anytime</p>
                                    <p><del>65+ top Live</del></p>
                                    <p><del>TV Channels</del></p>
                                </div>
                                <div className="pricing-box-action">
                                    <p  className="btn btn-hover">
                                        <span>Register now</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 col-md-12 col-sm-12">
                            <div className="pricing-box hightlight">
                                <div className="pricing-box-header">
                                    <div className="pricing-name">
                                        Premium
                                    </div>
                                    <div className="pricing-price">
                                        $35.99 <span>/month</span>
                                    </div>
                                </div>
                                <div className="pricing-box-content">
                                    <p>Originals</p>
                                    <p>Swich plans anytime</p>
                                    <p>65+ top Live</p>
                                    <p>TV Channels</p>
                                </div>
                                <div className="pricing-box-action">
                                    <p className="btn btn-hover">
                                        <span>Register now</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Pricing