import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../Redux/ApiCalls';
import CustomPagination from '../components/layout/CustomPagination';

const Transactions = () => {
    const dispatch = useDispatch();
    const { transactions = { transactions: [] }, isFetching, error } = useSelector(state => state.transactions);

    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 10; // Number of transactions per page

    useEffect(() => {
        getTransactions(dispatch);
    }, [dispatch]);

    // Check if transactions.transactions is defined before slicing
    const transactionList = transactions.transactions || [];
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = transactionList.slice(indexOfFirstTransaction, indexOfLastTransaction);

    // Handle page change
    const pageHandler = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='container-fluid'>
            <Card>
                <Card.Header>
                    <h4>Transactions</h4>
                </Card.Header>
                <Card.Body style={{ overflowX: 'scroll' }}>
                    <Table striped bordered hover style={{ overflowX: 'scroll' }}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Country</th>
                                <th>Currency</th>
                                <th>Amount</th>
                                <th>Order Id</th>
                                <th>Payment Id</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isFetching ? (
                                <tr>
                                    <td colSpan="13">Loading...</td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan="13">Error loading transactions</td>
                                </tr>
                            ) : currentTransactions.length > 0 ? (
                                currentTransactions.map((transaction, i) => (
                                    <tr key={i}>
                                        <td>{indexOfFirstTransaction + i + 1}</td>
                                        <td>{transaction.name}</td>
                                        <td>{transaction.email}</td>
                                        <td>{transaction.phone}</td>
                                        <td>{transaction.city}</td>
                                        <td>{transaction.state}</td>
                                        <td>{transaction.country}</td>
                                        <td>{transaction.currency_type}</td>
                                        <td>{transaction.amount}</td>
                                        <td>{transaction.order_id}</td>
                                        <td>{transaction.payment_id}</td>
                                        <td>{transaction.status}</td>
                                        <td>{transaction.createdAt}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="13">No transactions found</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    {transactionList.length > 0 && (
                        <CustomPagination
                            pages={Math.ceil(transactionList.length / transactionsPerPage)}
                            pageHandler={pageHandler}
                            curPage={currentPage}
                        />
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default Transactions;
