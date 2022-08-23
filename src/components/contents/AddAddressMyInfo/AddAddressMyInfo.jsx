import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios/index';
import './AddAddressMyInfo.scss';
import { AddAddressZipCode } from '../index';

function AddAddressMyInfo() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [data, setData] = useState({
    addrName: '',
    recipient: '',
    phone: '',
    homePhone: '',
  });
  const [selectedItem, setSelectedItem] = useState({
    zipCode: '',
    streetAddr: '', // 도로명
    lotAddr: '', // 지번
    detailAddr: '',
  });

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleInputData = (e) => {
    const { name, value } = e.target;
    // const regPhone = /^[0-9]+$/;

    // console.log(name);
    // console.log(value);

    // if (name === 'phone' || name === 'homePhone') {
    //   if (regPhone.test(value) === true) {
    //     setValid({ [e.target.name]: true });
    //     setError({
    //       [e.target.name]: '',
    //     });
    //   } else return;
    // }

    setData({ ...data, [name]: value });
  };

  const handleNumber = (e) => {
    const { name, value } = e.target;
    const number = value.replace(/[^0-9]/gi, '');
    setData({ ...data, [name]: number });
  };

  const onReset = () => {
    setIsReset(!isReset);
    setData({
      ...data,
      addrName: '',
      recipient: '',
      phone: '',
      homePhone: '',
    });
    setSelectedItem({
      ...selectedItem,
      zipCode: '',
      streetAddr: '', // 도로명
      lotAddr: '', // 지번
      detailAddr: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 유효성 검사 후 datas 이용해서 서버에 추가
    const token = localStorage.getItem('token');
    axios
      .post(
        'http://13.209.26.150:9000/users/shipping-addr',
        {
          addrName: data.addrName,
          recipient: data.recipient,
          phone: data.phone,
          homePhone: data.homePhone,
          zipCode: selectedItem.zipCode,
          streetAddr: `${selectedItem.streetAddr} ${selectedItem.detailAddr}`, // 도로명
          lotAddr: `${selectedItem.lotAddr} ${selectedItem.detailAddr}`, //
        },
        {
          headers: {
            Authorization: JSON.parse(token),
          },
        },
      )
      .then((res) => {
        console.log(res);
      });
    navigate(-1);
  };

  return (
    <>
      <div id="m_content" style={isOpen ? { display: 'none' } : {}}>
        <div className="m_addrbx order_sectionwrap">
          <div className="delivery_detail">
            <div
              className="order_article new_delivery_add"
              style={{ display: 'block' }}
            >
              <div className="order_artcont">
                <div className="order_infoset">
                  <form onSubmit={handleSubmit}>
                    <ul className="order_infolist">
                      <li className="oi_th_inp">
                        <span className="oi_th">
                          <label htmlFor="addrName">주소별칭</label>
                        </span>
                        <div className="oi_cont">
                          <span className="inpbx">
                            <input
                              type="text"
                              id="addrName"
                              name="addrName"
                              placeholder="주소별칭 입력"
                              value={data.addrName}
                              maxLength="20"
                              onChange={handleInputData}
                            />
                          </span>
                          <span className="cmem_noti">
                            <em className="usable_value">
                              {/* <p>{error.addrName}</p> */}
                            </em>
                          </span>
                        </div>
                      </li>

                      <li className="oi_th_inp">
                        <span className="oi_th">
                          <label htmlFor="recipient">받는 분</label>
                        </span>
                        <div className="oi_cont">
                          <span className="inpbx">
                            <input
                              type="text"
                              id="recipient"
                              name="recipient"
                              placeholder="받는분 성함입력"
                              value={data.recipient}
                              maxLength="20"
                              onChange={handleInputData}
                            />
                          </span>
                          <span className="cmem_noti">
                            <em className="usable_value">
                              {/* <p>{error.recipient}</p> */}
                            </em>
                          </span>
                        </div>
                      </li>
                      <li className="oi_th_inp">
                        <span className="oi_th">
                          <label htmlFor="phone">휴대폰</label>
                        </span>
                        <div className="oi_cont">
                          <div className="oi_phone_pd">
                            <span className="p_first">
                              <span className="des_select">
                                <span className="cc_ellip_in selected">
                                  010
                                </span>
                                <span className="sp_com sel_arrow">&nbsp;</span>
                                <span className="hide_select">
                                  <select id="phone" title="휴대폰 앞자리">
                                    <option
                                      value="010"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      010
                                    </option>
                                    <option
                                      value="011"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      011
                                    </option>
                                    <option
                                      value="016"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      016
                                    </option>
                                    <option
                                      value="017"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      017
                                    </option>
                                    <option
                                      value="018"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      018
                                    </option>
                                    <option
                                      value="019"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      019
                                    </option>
                                  </select>
                                </span>
                              </span>
                            </span>
                            <span className="inpbx">
                              <input
                                type="tel"
                                title="휴대폰(숫자만 입력)"
                                placeholder="휴대폰(숫자만 입력)"
                                id="phoneNum2"
                                name="phone"
                                value={data.phone}
                                maxLength="8"
                                onChange={handleInputData}
                                onKeyUp={handleNumber}
                              />
                            </span>
                            <span className="cmem_noti">
                              <em className="usable_value">
                                {/* <p>{error.phone}</p> */}
                              </em>
                            </span>
                          </div>
                        </div>
                      </li>
                      <li className="oi_th_inp">
                        <span className="oi_th">
                          <label htmlFor="homePhone">전화번호(선택)</label>
                        </span>
                        <div className="oi_cont">
                          <div className="oi_phone_pd">
                            <span className="p_first">
                              <span className="des_select">
                                <span className="cc_ellip_in">선택</span>
                                <span className="sp_com sel_arrow">&nbsp;</span>
                                <span className="hide_select">
                                  <select id="telNum1" title="전화번호 앞자리">
                                    <option value="">선택</option>
                                    <option
                                      value="02"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      02
                                    </option>
                                    <option
                                      value="031"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      031
                                    </option>
                                    <option
                                      value="032"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      032
                                    </option>
                                    <option
                                      value="033"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      033
                                    </option>
                                    <option
                                      value="041"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      041
                                    </option>
                                    <option
                                      value="042"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      042
                                    </option>
                                    <option
                                      value="043"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      043
                                    </option>
                                    <option
                                      value="051"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      051
                                    </option>
                                    <option
                                      value="044"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      044
                                    </option>
                                    <option
                                      value="052"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      052
                                    </option>
                                    <option
                                      value="053"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      053
                                    </option>
                                    <option
                                      value="054"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      054
                                    </option>
                                    <option
                                      value="055"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      055
                                    </option>
                                    <option
                                      value="061"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      061
                                    </option>
                                    <option
                                      value="062"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      062
                                    </option>
                                    <option
                                      value="063"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      063
                                    </option>
                                    <option
                                      value="064"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      064
                                    </option>
                                    <option
                                      value="070"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      070
                                    </option>
                                    <option
                                      value="080"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      080
                                    </option>
                                    <option
                                      value="0505"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      0505
                                    </option>
                                    <option
                                      value="0507"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      0507
                                    </option>
                                    <option
                                      value="010"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      010
                                    </option>
                                    <option
                                      value="011"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      011
                                    </option>
                                    <option
                                      value="016"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      016
                                    </option>
                                    <option
                                      value="017"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      017
                                    </option>
                                    <option
                                      value="018"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      018
                                    </option>
                                    <option
                                      value="019"
                                      addtoptnval1=""
                                      addtoptnval2=""
                                    >
                                      019
                                    </option>
                                  </select>
                                </span>
                              </span>
                            </span>
                            <span className="inpbx">
                              <input
                                type="tel"
                                id="homePhone"
                                name="homePhone"
                                value={data.homePhone}
                                maxLength="8"
                                placeholder="전화번호(숫자만 입력)"
                                title="전화번호(숫자만 입력)"
                                onChange={handleInputData}
                                onKeyUp={handleNumber}
                              />
                            </span>
                            <span className="cmem_noti">
                              <em className="usable_value">
                                {/* <p>{error.homePhone}</p> */}
                              </em>
                            </span>
                          </div>
                        </div>
                      </li>
                      <li className="oi_th_inp">
                        <span className="oi_th">
                          <label htmlFor="zipCode">배송주소</label>
                        </span>
                        <div className="oi_cont">
                          <div className="oi_cblock oi_post_pd">
                            <div className="in_bwrap">
                              <span className="in_b">
                                <span className="inpbx">
                                  <input
                                    type="text"
                                    name="zipCode"
                                    title="우편번호 입력"
                                    readOnly="readonly"
                                    onClick={handleIsOpen}
                                    onChange={handleInputData}
                                    value={selectedItem.zipCode}
                                  />
                                </span>
                                <span className="cmem_noti">
                                  <em className="usable_value">
                                    {/* <p>{error.zipCode}</p> */}
                                  </em>
                                </span>
                              </span>
                            </div>
                            <button
                              type="button"
                              className="b_def3"
                              onClick={handleIsOpen}
                            >
                              우편번호
                            </button>
                          </div>
                          {selectedItem.detailAddr && (
                            <div className="addr_info">
                              <strong className="info_tit">도로명</strong>
                              <span id="roadNmAddr" className="info_cont">
                                {selectedItem.streetAddr}{' '}
                                {selectedItem.detailAddr}
                              </span>
                              <strong className="info_tit">지번</strong>
                              <span id="lotnoAddr" className="info_cont">
                                {selectedItem.lotAddr} {selectedItem.detailAddr}
                              </span>
                            </div>
                          )}
                        </div>
                      </li>
                    </ul>
                    <div className="order_btnarea2 order_btnarea3">
                      <ul className="bnbox">
                        <li>
                          <button
                            type="button"
                            onClick={onReset}
                            className="b_def"
                          >
                            초기화
                          </button>
                        </li>

                        <li>
                          <Link to="/destination" className="b_def">
                            취소
                          </Link>
                        </li>

                        <li>
                          <button type="submit" className="b_def5">
                            등록
                          </button>
                        </li>
                      </ul>
                    </div>

                    {/* <input type="hidden" name="shpplocSeq" defaultValue="" />
                  <input type="hidden" name="bascShpplocYn" defaultValue="" />
                  <input type="hidden" name="oldzipCode" defaultValue="" />
                  <input type="hidden" name="roadNmBascAddr" defaultValue="" />
                  <input type="hidden" name="roadNmDtlAddr" defaultValue="" />
                  <input type="hidden" name="lotnoBascAddr" defaultValue="" />
                  <input type="hidden" name="lotnoDtlAddr" defaultValue="" />
                  <input
                    type="hidden"
                    name="mbrIptAddrTypeCd"
                    defaultValue=""
                  />
                  <input type="hidden" name="mbrIptAddr" defaultValue="" />
                  <input type="hidden" name="shpplocRegPstCd" defaultValue="" />
                  <input type="hidden" name="addrExamRstCd" defaultValue="" />
                  <input type="hidden" name="rcptpeTelno" defaultValue="" />
                  <input type="hidden" name="rcptpeHpno" defaultValue="" /> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 우편번호 찾기 */}
      {isOpen && (
        <AddAddressZipCode
          handleIsOpen={handleIsOpen}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}
    </>
  );
}

export default AddAddressMyInfo;
