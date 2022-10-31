

import React from 'react';

const countryCode = () => {
    return (
<select name="countryCode" id>
          <option data-countrycode="US" value={1}>USA (+1)</option>
          <option data-countrycode="AR" value={54}>Argentina (+54)</option>
          <option data-countrycode="AW" value={297}>Aruba (+297)</option>
          <option data-countrycode="BS" value={1242}>Bahamas (+1242)</option>
          <option data-countrycode="BB" value={1246}>Barbados (+1246)</option>
          <option data-countrycode="BZ" value={501}>Belize (+501)</option>
          <option data-countrycode="BO" value={591}>Bolivia (+591)</option>
          <option data-countrycode="BR" value={55}>Brazil (+55)</option>
          <option data-countrycode="CA" value={1}>Canada (+1)</option>
          <option data-countrycode="CL" value={56}>Chile (+56)</option>
          <option data-countrycode="CO" value={57}>Colombia (+57)</option>
          <option data-countrycode="CR" value={506}>Costa Rica (+506)</option>
          <option data-countrycode="DO" value={1809}>Dominican Republic (+1809)</option>
          <option data-countrycode="EC" value={593}>Ecuador (+593)</option>
          <option data-countrycode="SV" value={503}>El Salvador (+503)</option>
          <option data-countrycode="GT" value={502}>Guatemala (+502)</option>
          <option data-countrycode="HT" value={509}>Haiti (+509)</option>
          <option data-countrycode="HN" value={504}>Honduras (+504)</option>
          <option data-countrycode="JM" value={1876}>Jamaica (+1876)</option>
          <option data-countrycode="MX" value={52}>Mexico (+52)</option>
          <option data-countrycode="NI" value={505}>Nicaragua (+505)</option>
          <option data-countrycode="PA" value={507}>Panama (+507)</option>
          <option data-countrycode="PY" value={595}>Paraguay (+595)</option>
          <option data-countrycode="PE" value={51}>Peru (+51)</option>
          <option data-countrycode="PR" value={1787}>Puerto Rico (+1787)</option>
          <option data-countrycode="ES" value={34}>Spain (+34)</option>
          <option data-countrycode="UY" value={598}>Uruguay (+598)</option>
      </select>
    );
};

export default countryCode;