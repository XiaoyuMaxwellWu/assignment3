import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { Link, useNavigate } from 'react-router-dom';

export default function PreProfileScreen() {
  const navigate = useNavigate();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <div>
      <h3 id="YA">Your account</h3>
      <table>
        <tr>
          <th>
            <Link to={`/profile`} className="pre-profile-link">
              <div className="card card-bodyPre">
                <img
                  className="small"
                  src="/images/user-profile.png"
                  alt="user profile"
                ></img>
                <div>
                  Your profile
                  <br />
                  <br />
                  Edit your information
                </div>
              </div>
            </Link>
          </th>
          <th>
            <Link to={`/orderhistory`} className="pre-profile-link">
              <div className="card card-bodyPre">
                <img
                  className="small"
                  src="/images/order-history.png"
                  alt="history orders"
                ></img>
                <div>
                  Your history orders
                  <br />
                  <br />
                  View your previous orders
                </div>
              </div>
            </Link>
          </th>
        </tr>
        <tr>
          <th>
            {userInfo && userInfo.isSeller && (
              <Link to={`/productlist/seller`} className="pre-profile-link">
                <div className="card card-bodyPre">
                  <img
                    className="small"
                    src="/images/seller-products.jpeg"
                    alt="seller products"
                  ></img>
                  <div>
                    Your products
                    <br />
                    <br />
                    View your products to sell
                  </div>
                </div>
              </Link>
            )}
          </th>
          <th>
            {userInfo && userInfo.isSeller && (
              <Link to={`/orderlist/seller`} className="pre-profile-link">
                <div className="card card-bodyPre">
                  <img
                    className="small"
                    src="/images/seller-orders.jpeg"
                    alt="seller orders"
                  ></img>
                  <div>
                    Your orders
                    <br />
                    <br />
                    View the orders for your products
                  </div>
                </div>
              </Link>
            )}
          </th>
        </tr>
      </table>
    </div>
  );
}
