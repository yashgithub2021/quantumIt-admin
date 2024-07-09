import CountUp from "react-countup";

function CardTransactions(props) {
    return (
        <div className='col-lg-3 col-sm-6'>
            <div class="small-box bg-danger">
                <div class="inner">
                    <h3>
                        <CountUp end={props.total}
                            useGrouping={false}
                            duration={"2"} />
                    </h3>
                    <p>Total Transactions</p>
                </div>
                <div class="icon">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 14L2 9l5-5v3h6v2H7v3zm10 2v-3H11v-2h6V8l5 5-5 5z"></path>
                    </svg>

                </div>
            </div>
        </div>
    );
}

export default CardTransactions;