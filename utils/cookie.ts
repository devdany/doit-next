import Cookies from 'js-cookie';
import { NextPageContext } from 'next';
import cookie from 'cookie';
import isBrowser from './browser';

export function getCookie(name: string, ctx?: NextPageContext) {
  if (isBrowser()) return Cookies.get(name);
  return cookie.parse(String(ctx?.req?.headers.cookie))[name];
}

export function removeCookie(name: string) {
  if (isBrowser()) return Cookies.remove(name);
  return null;
}

export function setCookie(name: string, value: string) {
  if (isBrowser()) return Cookies.set(name, value);
  return null;
}
