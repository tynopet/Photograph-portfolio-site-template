export const setCookie = (name, value, options) => {
  options = options || {}

  var expires = options.expires

  if (typeof expires === 'number' && expires) {
    var d = new Date()
    d.setTime(d.getTime() + expires * 1000)
    expires = options.expires = d
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString()
  }

  value = encodeURIComponent(value)

  var updatedCookie = name + '=' + value

  for (var propName in options) {
    updatedCookie += '; ' + propName
    var propValue = options[propName]
    if (propValue !== true) {
      updatedCookie += '=' + propValue
    }
  }

  document.cookie = updatedCookie
}

export const deleteCookie = name => setCookie(name, '', { expires: -1 })

export const getCookie = (cname, req) => {
  let name = cname + '='
  let decodedCookie
  if (typeof window === 'undefined') {
    decodedCookie = decodeURIComponent(req.headers.cookie)
  } else decodedCookie = decodeURIComponent(document.cookie)
  var ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}
