import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosUtil';
import CardForDash from '../components/Card';
import CardContributor from '../components/CardContributor';
import CardQueries from '../components/CardQueries';
import CardProjects from "../components/CardProjects";
import CardFeedbacks from '../components/CardFeedbacks';
import CardReviews from '../components/CardReviews';
import CardTransactions from '../components/CardTransactions';

const Dashboard = () => {
  const [Data, setData] = useState({
    totalBlogs: 0,
    totalQueries: 0,
    totalContributors: 0,
    totalProjects: 0,
    totalFeedbacks: 0,
    totalReviews: 0,
    totalTransactions: 0
  })
  const getDashboard = async () => {
    const { data } = await axiosInstance('api/users/dashboard');
    setData(data);
    console.log(data.totalBlogs);
  };

  useEffect(() => {
    getDashboard();
    return () => {

    }
  }, [])

  return (
    <div className='container-fluid'>
      <div className="my-3 pb-2 row" style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.2)" }} >
        <div className="col-md-6">
          <h3>Dashboard</h3>
        </div>

      </div>
      <div className='mb-3 row'>
        {/* <CardForDash total={Data.totalBlogs} /> */}
        {/* <CardContributor total={Data.totalContributors} /> */}
        <CardProjects total={Data.totalProjects} />
        <CardReviews total={Data.totalBlogs} />
        <CardQueries total={Data.totalQueries} />
        <CardFeedbacks total={Data.totalFeedbacks} />
        <CardTransactions total={Data.totalTransactions} />
      </div>
    </div>
  )
}

export default Dashboard