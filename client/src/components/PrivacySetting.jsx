import React, {useState} from 'react';
import styles from '../css/PrivacySetting.module.css'
import Toggle from 'react-toggle'
import Logo from '../assets/mindtale.png'
import Close from '../assets/tclose.png'
import Open from '../assets/open.png'

export const PrivacySetting = () => {

    const [isPrivateAcc, setPrivateAcc] = useState(false)
    const handlePrivateClick = () => {
        setPrivateAcc( !isPrivateAcc )
    }

    return(
        <div className={styles.PrivacySetting}>
            <div className={styles.Logo}>
                <img src={Logo} />
            </div>
            <div className={styles.SettingSample}>
                <div className={styles.SpecificSetting}>
                    <span>Private account</span>
                    <span>
                        Enabling Private Account ensures that your profile remains undiscoverable to others, safeguarding your privacy.
                    </span>
                    
                </div>
                {
                    isPrivateAcc ? <img onClick={handlePrivateClick} src={Close} /> : <img onClick={handlePrivateClick} src={Open} />
                }
            </div>

            <div className={styles.SettingSample}>
                <div className={styles.SpecificSetting}>
                    <span>Private account</span>
                    <span>
                        Enabling Private Account ensures that your profile remains undiscoverable to others, safeguarding your privacy.
                    </span>
                    
                </div>
                {
                    isPrivateAcc ? <img onClick={handlePrivateClick} src={Close} /> : <img onClick={handlePrivateClick} src={Open} />
                }
            </div>

            <div className={styles.SettingSample}>
                <div className={styles.SpecificSetting}>
                    <span>Private account</span>
                    <span>
                        Enabling Private Account ensures that your profile remains undiscoverable to others, safeguarding your privacy.
                    </span>
                    
                </div>
                {
                    isPrivateAcc ? <img onClick={handlePrivateClick} src={Close} /> : <img onClick={handlePrivateClick} src={Open} />
                }
            </div>

            <div className={styles.SettingSample}>
                <div className={styles.SpecificSetting}>
                    <span>Private account</span>
                    <span>
                        Enabling Private Account ensures that your profile remains undiscoverable to others, safeguarding your privacy.
                    </span>
                    
                </div>
                {
                    isPrivateAcc ? <img onClick={handlePrivateClick} src={Close} /> : <img onClick={handlePrivateClick} src={Open} />
                }
            </div>
        </div>  
    )
}

export default PrivacySetting;