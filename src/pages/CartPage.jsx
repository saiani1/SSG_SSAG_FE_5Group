import React from 'react';
import { useRecoilState } from 'recoil';
import { isLoginState } from '../recoil/isLoginState';
import { isItemsState } from '../recoil/isItemsState';
import {
  CartPageControl,
  CartPageParcel,
  CartPageFooter,
  CartPageLoginInfo,
  CartPageCartInfo,
  CartPageNoData,
  CartPageNoItems,
  CartPageTotal,
  CartPageParcelFootInfo,
  CartPageParcelToolBar,
} from '../components/contents';

import { MobileHeader, CartPageBtn } from '../components/ui';

function CartPage() {
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const [isItems, setIsItems] = useRecoilState(isItemsState);

  const onLogin = () => {
    setIsLogin(!isLogin);
  };

  const onItems = () => {
    setIsItems(!isItems);
  };
  return (
    <div
      id="m_wrap"
      className="reveal-left-wrap reveal-right-wrap mcom_wrap sticky_mnodr_acdo ssg scr_up v3"
    >
      <MobileHeader title="장바구니" />

      <div
        id="m_container"
        className="reveal-left-contents reveal-right-contents mcom_container mnodr_container_step ty_headfix"
      >
        <div id="m_content">
          {/* 가라 버튼 */}
          <button
            type="button"
            onClick={onLogin}
            style={{ marginRight: '10px' }}
          >
            {isLogin ? '로그아웃' : '로그인'}
          </button>
          <button type="button" onClick={onItems}>
            {isItems ? '장바구니 비우기' : '장바구니 추가'}
          </button>

          {!isLogin && !isItems && <CartPageNoData />}

          <div className="mnodr_info">
            <CartPageLoginInfo />
          </div>

          {isLogin && !isItems && <CartPageNoItems />}

          {isItems && (
            <>
              <div
                className="mnodr_odrplus"
                id="divAddOrdInfo"
                style={{ display: 'none' }}
              />
              <div className="mnodr_control_wrap">
                <CartPageControl />
                <CartPageParcel />
              </div>
              <div className="mnodr_thickhr" />

              <CartPageTotal />

              <div className="mnodr_thickhr" />
              <div className="mnodr_buyoften v2" id="recommendationCartItem" />
              <div className="mnodr_thickhr" />

              <CartPageParcelFootInfo />
            </>
          )}

          <CartPageCartInfo />
        </div>

        {isItems && (
          <div className="mnodr_toolbar2">
            <CartPageParcelToolBar />
            <CartPageBtn />
          </div>
        )}

        <CartPageFooter />
      </div>
    </div>
  );
}

export default CartPage;