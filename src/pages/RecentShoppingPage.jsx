import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import {
  RecentShoppingHeader,
  RecentShoppingProductList,
  NoDataMessage,
} from '../components/contents';
import { ToolbarList } from '../components/toolbar/ToolbarList';
import { FloatingContents, Header } from '../components/common';
import { isOpenState } from '../store/states';

function RecentShoppingPage() {
  const [recentShoppingData, setRecentShoppingData] = useState(undefined);
  const [isRecentItemDelete, setIsRecentItemDelete] = useState(false);
  const [isNoData, setisNoData] = useState(false);
  const [isWishChange, setIsWishChange] = useState(false);
  const [isOpen] = useRecoilState(isOpenState);

  const token = localStorage.getItem('token');
  const headers = {
    headers: {
      Authorization: JSON.parse(token),
    },
  };

  useEffect(() => {
    const getRecentDataUrl = 'http://13.209.26.150:9000/users/recent/product';

    axios
      .get(getRecentDataUrl, headers)
      .then((res) => {
        const data = res.data.result;
        if (typeof data === 'undefined' || typeof data[0] === 'undefined') {
          setisNoData(true);
          setRecentShoppingData(undefined);
        } else {
          setisNoData(false);
          setRecentShoppingData(res.data.result);
        }
      })
      .catch((err) => new Error(err));
  }, [isRecentItemDelete, isWishChange]);

  if (isOpen) {
    return <Header />;
  }

  return (
    <div id="m_wrap" className="mcom_wrap ssg">
      <link
        rel="stylesheet"
        type="text/css"
        href="//sui.ssgcdn.com/ui/m_ssg/css/mcom_page_history.css"
      />
      <div id="m_container" className="mcom_container">
        <div id="m_content">
          <div className="cmhistory_wrap" id="_cmhistory_wrap">
            <RecentShoppingHeader />

            <div className="cmhistory_ct">
              {recentShoppingData && (
                <div className="cmhistory_scroll" id="_cmhistory_scroll">
                  <div className="iscroll">
                    <ul className="cmhistory_list_area">
                      {recentShoppingData.map((recentItem) => (
                        <RecentShoppingProductList
                          key={recentItem.viewHistoryId}
                          recentItem={recentItem}
                          isRecentItemDelete={isRecentItemDelete}
                          setIsRecentItemDelete={setIsRecentItemDelete}
                          isWishChange={isWishChange}
                          setIsWishChange={setIsWishChange}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {isNoData && <NoDataMessage />}
            </div>
          </div>
        </div>
      </div>
      <ToolbarList recentShoppingData={recentShoppingData} />
      <FloatingContents pageName="recentHistory" />
    </div>
  );
}

export default RecentShoppingPage;
