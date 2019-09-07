import React from 'react';

import twitter from '../../../../assets/images/logo-twitter.svg';
import telegram from '../../../../assets/images/logo-telegram.svg';
import github from '../../../../assets/images/logo-git.svg';
import background from '../../../../assets/images/footerm.svg';
import './styles.scss';

const Footer = () => {
  return (
    <footer>
      <div className="title">Need Help?</div>
      <div className="content">
        <p>We are next to you right now at ETHBoston</p>
      </div>
      <div className="contact-info">
        <div className="contact-link">
          <a href={'https://t.me/poapxyz'} target={'_blank'}>
            <img src={telegram} alt={'Telegram'} />
          </a>
        </div>
        <div className="contact-link">
          <a href={'https://twitter.com/poapxyz'} target={'_blank'}>
            <img src={twitter} alt={'Twitter'} />
          </a>
        </div>
        <div className="contact-link">
          <a href={'https://www.github.com/poapxyz/'} target={'_blank'}>
            <img src={github} alt={'Github'} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
