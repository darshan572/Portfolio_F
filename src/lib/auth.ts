import { AuthState, AdminUser } from "@/types/portfolio";

class AuthManager {
  private static instance: AuthManager;
  private readonly STORAGE_KEY = "adminAuth";
  private readonly USER_KEY = "adminUser";
  private readonly SESSION_TIMEOUT = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

  private constructor() {}

  public static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  // Initialize admin user (call this on first setup)
  public initializeAdmin(username: string, password: string): void {
    const adminUser: AdminUser = {
      username,
      passwordHash: this.hashPassword(password),
    };

    localStorage.setItem(this.USER_KEY, JSON.stringify(adminUser));
  }

  // Simple password hashing (in production, use proper hashing)
  private hashPassword(password: string): string {
    // Simple hash for demo purposes - use bcrypt or similar in production
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString();
  }

  // Check if admin user exists
  public hasAdminUser(): boolean {
    return localStorage.getItem(this.USER_KEY) !== null;
  }

  // Login
  public login(username: string, password: string): boolean {
    try {
      const savedUser = localStorage.getItem(this.USER_KEY);
      if (!savedUser) {
        // If no admin user exists, create one with the provided credentials
        this.initializeAdmin(username, password);
        // Directly authenticate after creating user
        const authState: AuthState = {
          isAuthenticated: true,
          lastLogin: new Date().toISOString(),
          sessionTimeout: this.SESSION_TIMEOUT,
        };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(authState));
        return true;
      }

      const adminUser: AdminUser = JSON.parse(savedUser);
      const passwordHash = this.hashPassword(password);

      if (
        adminUser.username === username &&
        adminUser.passwordHash === passwordHash
      ) {
        const authState: AuthState = {
          isAuthenticated: true,
          lastLogin: new Date().toISOString(),
          sessionTimeout: this.SESSION_TIMEOUT,
        };

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(authState));

        // Update last login in user record
        adminUser.lastLogin = authState.lastLogin;
        localStorage.setItem(this.USER_KEY, JSON.stringify(adminUser));

        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  }

  // Check if user is authenticated
  public isAuthenticated(): boolean {
    try {
      const authData = localStorage.getItem(this.STORAGE_KEY);
      if (!authData) return false;

      const authState: AuthState = JSON.parse(authData);
      if (!authState.isAuthenticated) return false;

      // Check session timeout
      if (authState.lastLogin) {
        const lastLogin = new Date(authState.lastLogin).getTime();
        const now = Date.now();
        const timeDiff = now - lastLogin;

        if (timeDiff > authState.sessionTimeout) {
          this.logout();
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error("Auth check error:", error);
      return false;
    }
  }

  // Logout
  public logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    // Dispatch logout event for components to react
    window.dispatchEvent(new CustomEvent("adminLogout"));
  }

  // Get current auth state
  public getAuthState(): AuthState | null {
    try {
      const authData = localStorage.getItem(this.STORAGE_KEY);
      return authData ? JSON.parse(authData) : null;
    } catch (error) {
      console.error("Error getting auth state:", error);
      return null;
    }
  }

  // Get admin user info
  public getAdminUser(): Omit<AdminUser, "passwordHash"> | null {
    try {
      const userData = localStorage.getItem(this.USER_KEY);
      if (!userData) return null;

      const adminUser: AdminUser = JSON.parse(userData);
      // Return user data without password hash
      return {
        username: adminUser.username,
        lastLogin: adminUser.lastLogin,
      };
    } catch (error) {
      console.error("Error getting admin user:", error);
      return null;
    }
  }

  // Update password
  public updatePassword(currentPassword: string, newPassword: string): boolean {
    try {
      const userData = localStorage.getItem(this.USER_KEY);
      if (!userData) return false;

      const adminUser: AdminUser = JSON.parse(userData);
      const currentPasswordHash = this.hashPassword(currentPassword);

      if (adminUser.passwordHash === currentPasswordHash) {
        adminUser.passwordHash = this.hashPassword(newPassword);
        localStorage.setItem(this.USER_KEY, JSON.stringify(adminUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Password update error:", error);
      return false;
    }
  }

  // Update session (extend timeout)
  public updateSession(): void {
    try {
      const authData = localStorage.getItem(this.STORAGE_KEY);
      if (authData) {
        const authState: AuthState = JSON.parse(authData);
        authState.lastLogin = new Date().toISOString();
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(authState));
      }
    } catch (error) {
      console.error("Session update error:", error);
    }
  }

  // Clear all auth data (for debugging/reset)
  public clearAuthData(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  // Get session time remaining
  public getSessionTimeRemaining(): number {
    try {
      const authState = this.getAuthState();
      if (!authState || !authState.lastLogin) return 0;

      const lastLogin = new Date(authState.lastLogin).getTime();
      const now = Date.now();
      const elapsed = now - lastLogin;
      const remaining = authState.sessionTimeout - elapsed;

      return Math.max(0, remaining);
    } catch (error) {
      console.error("Error calculating session time:", error);
      return 0;
    }
  }

  // Format remaining time as human readable
  public formatSessionTimeRemaining(): string {
    const remaining = this.getSessionTimeRemaining();
    if (remaining <= 0) return "Session expired";

    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
      return `${hours}h ${minutes}m remaining`;
    } else {
      return `${minutes}m remaining`;
    }
  }
}

export default AuthManager;
