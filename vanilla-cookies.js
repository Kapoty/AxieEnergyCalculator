// Vanilla Cookies - a dead simple yet full-featured JavaScript cookie library 
// derived from http://stackoverflow.com/a/19189846

/*********************************************************
Gets the value of a cookie.
**********************************************************/
getCookie = function(sName)
{
    var oCrumbles = document.cookie.split(';');
    for(var i=0; i<oCrumbles.length;i++)
    {
        var oPair= oCrumbles[i].split('=');
        var sKey = decodeURIComponent(oPair[0].trim());
        var sValue = oPair.length>1 ? oPair[1] : '';
        if(sKey == sName) {
            return decodeURIComponent(sValue);
        }
    }
    return '';
};
/*****************************************************************
Sets the value of a cookie. Expiration date and path are optional.
******************************************************************/
setCookie = function(sName, sValue, options)
{
    //oDate.setYear(oDate.getFullYear()+1);
    var sCookie = encodeURIComponent(sName) + '=' + encodeURIComponent(sValue);
  
    // Shorthand: options === expires date
    if (options && options instanceof Date) {
        options = {
            expires: options
        };
    }
    // Longhand: options object
    if (options && typeof options == 'object') {
        if (options.expires) {
            sCookie += '; expires=' + options.expires.toGMTString();
        }
        if (options.path) {
            sCookie += '; path=' + options.path.toString();
        }
        if (options.domain) {
            sCookie += '; domain=' + options.domain.toString();
        }
        if (options.secure) {
            sCookie += '; secure';
        }
    }
    document.cookie= sCookie;
};
/*********************************************************
Clears and immediately expires a cookie.
**********************************************************/
removeCookie = function(sName, options)
{
    if (!options) {
        var options = {};
    }
    options.expires = new Date();
    setCookie(sName, '', options);
};