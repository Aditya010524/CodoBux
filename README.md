CodoBux – Offline-First Contractor Job App

This repository contains a React Native (CLI) mobile application built as part of a technical assessment.
The primary focus of this project is offline-first behaviour, data integrity, and clear architectural reasoning, rather than UI polish.

🚀 Android Setup Instructions

This project is tested primarily on Android.

Prerequisites

Node.js (LTS recommended)

Android Studio (with Android SDK & Emulator)

Java 17 (recommended for React Native CLI)

React Native CLI environment properly set up

Steps to Run
git clone https://github.com/Aditya010524/CodoBux.git
cd CodoBux
npm install
npx react-native run-android


If you face any environment issues, an APK build is also provided (link shared separately) for quick testing.

📱 Project Overview

CodoBux is an offline-first contractor job management app that allows users to:

Sign up and log in

Create and view contractor jobs

Continue working even when the device is offline

Persist job data locally with no data loss

The app is designed to behave reliably under:

Network loss

App restarts

Offline → Online transitions

🧱 App Architecture

React Native CLI (Bare Workflow)
Chosen for better control over native modules and production readiness.

Zustand
Used for simple, predictable global state management.

Service Layer
API calls and business logic are separated from UI components.

Storage Layer
AsyncStorage is used for offline persistence.

This layered approach keeps the codebase clean, scalable, and easy to reason about.

🔐 Authentication

Supports Signup and Login

Backend returns a token on success

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

Easy to implement within limited time

Sufficient for small-to-medium datasets

In a production environment, this would be migrated to MMKV for better performance.

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

Sync is designed to happen automatically when internet is restored

No manual “Sync” button is used

Due to backend API issues (internal server errors during development), full online CRUD and sync could not be demonstrated, but the offline-first flow is fully implemented.

📝 Notes & 🎥 Video
Notes

Unlimited notes per job are supported in design

Notes are intended to work offline and sync independently

Video

Video upload was not implemented

Architecture is prepared for future support

🌐 Handling Offline Scenarios

Local-first data access

Zustand manages app state cleanly

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
