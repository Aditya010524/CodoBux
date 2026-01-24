# 🚧 CodoBux – Offline-First Contractor Job App

CodoBux is a **React Native (CLI)** mobile application built as part of a technical assessment.  
The primary goal of this project is to demonstrate **offline-first architecture**, **data integrity**, and **robust handling of network instability**, rather than UI polish.

---

## 📱 Project Overview

CodoBux allows contractors to manage jobs reliably, even when the device is offline.

Key capabilities:
- User authentication (Signup & Login)
- Create and view contractor jobs
- Full offline support with local persistence
- No data loss during network changes or app restarts

The app is designed to handle:
- Offline → Online transitions
- Online → Offline transitions
- App restarts during offline usage
- Partial or failed API responses

---

## 🚀 Android Setup Instructions

> **Note:** This project is tested primarily on **Android**.

### Prerequisites
- Node.js (LTS recommended)
- Android Studio (Android SDK & Emulator)
- Java 17
- React Native CLI environment properly configured


### Run the App

```bash
git clone https://github.com/Aditya010524/CodoBux.git
cd CodoBux
npm install
npx react-native run-android
```


If you face any environment or setup issues, an APK build is also provided (shared separately) so the app can be tested without running the project locally.

🧱 App Architecture

React Native CLI (Bare Workflow)
Chosen for better control over native behaviour and production-level flexibility.

Zustand
Used for lightweight, predictable global state management with minimal boilerplate.

Service Layer
API calls and business logic are separated from UI components.

Storage Layer
AsyncStorage is used for offline persistence.

This layered architecture keeps the codebase clean, scalable, and easy to reason about.

🔐 Authentication

Supports Signup and Login

Backend returns a token on successful authentication

Token is stored securely using AsyncStorage

Token is automatically attached to all API requests

If the backend returns 401 Unauthorized, the user is redirected to login

💾 Local Storage Strategy

AsyncStorage is used to store:

Authentication token

User profile

Job data created while offline

Why AsyncStorage?

Simple and stable

Quick to implement within limited time

Suitable for small-to-medium datasets

In a production system, this would be migrated to MMKV for faster reads/writes and better performance.

📦 Offline-First Job Handling
What Works Offline

Creating jobs

Viewing job list

Viewing job details

Behaviour When Offline

Jobs are saved locally

No data loss occurs

UI continues to function normally

Jobs are marked as locally stored (pending sync)

Sync Behaviour

Sync is designed to happen automatically when the internet connection is restored

No manual “Sync” button is used

Due to backend API issues (internal server errors during development), full online CRUD and sync could not be demonstrated.
However, the offline-first data flow and persistence logic are fully implemented.

📝 Notes & 🎥 Video
Notes

Unlimited notes per job are supported in design

Notes are intended to work offline and sync independently

Video

Video upload was not implemented

Architecture allows future support without major refactoring

🌐 Handling Offline Scenarios

Local-first data access

Zustand manages application state cleanly

App continues working during:

Network loss

App restarts while offline

Clear UI indicators for offline state

⚠️ Failure & Retry Handling

All API calls are wrapped in try/catch

Network errors are handled gracefully

Failed operations do not crash the app

Data remains safely stored locally

Advanced retry strategies (background retries, exponential backoff) are planned for production.

🚧 Known Limitations

Backend API errors prevented full online CRUD testing

Background sync is not implemented

Video upload is not implemented

AsyncStorage is not ideal for very large datasets

Pagination is not implemented for job lists

🔮 Improvements for a Production System

Given more time and a production environment, the following improvements would be implemented:

Storage & Performance

Migrate from AsyncStorage to MMKV for faster reads/writes

State Management

Centralised global network state (isOnline) using Zustand

Sync & Reliability

Background sync using native background tasks

Media Handling

Support multiple video uploads per job

Chunked uploads for large videos and images

Data Fetching

Pagination for job lists

Pull-to-refresh

TanStack Query (React Query) for:

Server state management

Caching

Background refetching

Pagination handling

Architecture

Centralised network layer

Clear separation between offline queue and sync engine

Improved logging and error reporting

📌 Final Note

This project prioritises:

Correct offline behaviour

Data consistency

Clear reasoning and architecture

UI polish and advanced optimisations were intentionally kept secondary.


