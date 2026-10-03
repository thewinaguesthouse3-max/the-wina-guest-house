import { useState, useEffect } from 'react';
import { initialProperties, Property } from '@/src/data/properties';

export interface BookingUrlsConfig {
  bookingUrlEchoBeach: string;
  bookingUrlGuestHouse2: string;
  bookingUrlGuestHouse3: string;
  bookingUrlVilla01: string;
  bookingUrlVilla02: string;
}

export interface ContactConfig {
  whatsappNumber: string; // e.g. "+62 812-3456-7890"
  whatsappRaw: string; // "6281234567890" for wa.me links
  email: string;
  instagram: string;
  address: string;
}

export interface TrackingEvent {
  id: string;
  type: 'BOOKING_CLICK' | 'WHATSAPP_CLICK' | 'FORM_SUBMIT' | 'PROPERTY_VIEW';
  propertyId?: string;
  propertyName?: string;
  targetUrl?: string;
  metadata?: string;
  timestamp: string;
}

const DEFAULT_BOOKING_URLS: BookingUrlsConfig = {
  bookingUrlEchoBeach: 'https://www.booking.com/hotel/id/the-wina-echo-beach-guest-house.html',
  bookingUrlGuestHouse2: 'https://www.booking.com/hotel/id/the-wina-guest-house-2.html',
  bookingUrlGuestHouse3: 'https://www.booking.com/hotel/id/the-wina-guest-house-3.html',
  bookingUrlVilla01: 'https://www.booking.com/hotel/id/the-wina-villa-01.html',
  bookingUrlVilla02: 'https://www.booking.com/hotel/id/the-wina-villa-02.html',
};

const DEFAULT_CONTACT: ContactConfig = {
  whatsappNumber: '+62 812-3987-6543',
  whatsappRaw: '6281239876543',
  email: 'thewinaguesthouse3@gmail.com',
  instagram: '@the_wina_guesthouse',
  address: 'Canggu, Badung Regency, Bali 80351, Indonesia',
};

const STORAGE_KEY_PROPERTIES = 'thewina_properties_v1';
const STORAGE_KEY_URLS = 'thewina_booking_urls_v1';
const STORAGE_KEY_CONTACT = 'thewina_contact_v1';
const STORAGE_KEY_EVENTS = 'thewina_tracking_events_v1';

export function getStoredBookingUrls(): BookingUrlsConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_URLS);
    if (raw) return { ...DEFAULT_BOOKING_URLS, ...JSON.parse(raw) };
  } catch (e) {
    console.error('Error reading booking URLs from localStorage', e);
  }
  return DEFAULT_BOOKING_URLS;
}

export function getStoredContact(): ContactConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONTACT);
    if (raw) return { ...DEFAULT_CONTACT, ...JSON.parse(raw) };
  } catch (e) {
    console.error('Error reading contact from localStorage', e);
  }
  return DEFAULT_CONTACT;
}

export function getStoredProperties(): Property[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROPERTIES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading properties from localStorage', e);
  }
  return initialProperties;
}

export function recordTrackingEvent(event: Omit<TrackingEvent, 'id' | 'timestamp'>) {
  try {
    const newEvent: TrackingEvent = {
      ...event,
      id: 'evt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      timestamp: new Date().toISOString(),
    };
    const raw = localStorage.getItem(STORAGE_KEY_EVENTS);
    const events: TrackingEvent[] = raw ? JSON.parse(raw) : [];
    events.unshift(newEvent);
    // Keep last 100 events
    const trimmed = events.slice(0, 100);
    localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(trimmed));
    // Trigger custom event so any active dashboard updates immediately
    window.dispatchEvent(new CustomEvent('wina_tracking_update', { detail: newEvent }));
    console.log('[The Wina Analytics] Logged event:', newEvent);
  } catch (e) {
    console.error('Failed to log tracking event', e);
  }
}

export function getTrackingEvents(): TrackingEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_EVENTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading tracking events', e);
  }
  return [];
}
