import CountUp from "react-countup";

function CardQueries(props) {
    return (
        <div className='col-lg-3 col-sm-6'>
            <div className="small-box " style={{ background: '#6610f2' }}>
                <div className="inner">
                    <h3>
                        <CountUp end={props.total}
                            useGrouping={false}
                            duration={"2"} />
                    </h3>
                    <p>Total Blogs</p>
                </div>
                <div className="icon">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 4H4C2.89 4 2 4.89 2 6v12c0 1.1.89 2 2 2h16c1.11 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 12H4V6h16v10zM7 10h10v2H7v-2zm0 4h10v2H7v-2z"></path>
                    </svg>

                </div>
            </div>
        </div>
    );
}

export default CardQueries;