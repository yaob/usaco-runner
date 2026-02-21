#!/usr/bin/env node

/**
 * Simple test runner for USACO Runner application
 * This script can be used to run basic functional tests
 */

// Import the test functions
const fs = require('fs');

console.log("=== USACO Runner Test Runner ===");
console.log("Running basic functional tests...\n");

// Test 1: Check if main HTML file exists
try {
    const htmlExists = fs.existsSync('../public/index.html');
    if (htmlExists) {
        console.log("✓ Main HTML file exists");
    } else {
        console.log("✗ Main HTML file missing");
    }
} catch (error) {
    console.log("✗ Error checking HTML file:", error.message);
}

// Test 2: Check if test files exist
try {
    const testFileExists = fs.existsSync('./app-tests.js');
    const runnerFileExists = fs.existsSync('./test-runner.html');
    
    if (testFileExists) {
        console.log("✓ Test functions file exists");
    } else {
        console.log("✗ Test functions file missing");
    }
    
    if (runnerFileExists) {
        console.log("✓ Test runner HTML exists");
    } else {
        console.log("✗ Test runner HTML missing");
    }
} catch (error) {
    console.log("✗ Error checking test files:", error.message);
}

// Test 3: Basic structure validation
console.log("\n--- Basic Structure Tests ---");

// Simple validation of HTML structure
try {
    const htmlContent = fs.readFileSync('../public/index.html', 'utf8');
    
    // Check for key elements
    const hasMainLayout = htmlContent.includes('main-layout');
    const hasInputSection = htmlContent.includes('runtime-input-section');
    const hasOutputSection = htmlContent.includes('output-section');
    const hasEditorContainer = htmlContent.includes('editor-container');
    
    if (hasMainLayout) {
        console.log("✓ Main layout structure found");
    } else {
        console.log("✗ Main layout structure missing");
    }
    
    if (hasInputSection) {
        console.log("✓ Input section structure found");
    } else {
        console.log("✗ Input section structure missing");
    }
    
    if (hasOutputSection) {
        console.log("✓ Output section structure found");
    } else {
        console.log("✗ Output section structure missing");
    }
    
    if (hasEditorContainer) {
        console.log("✓ Editor container structure found");
    } else {
        console.log("✗ Editor container structure missing");
    }
    
    // Check for responsive design
    const hasResponsiveClasses = htmlContent.includes('grid-template-columns') || 
                               htmlContent.includes('flex') || 
                               htmlContent.includes('responsive');
    
    if (hasResponsiveClasses) {
        console.log("✓ Responsive design elements found");
    } else {
        console.log("⚠ Responsive design elements not found (may be okay)");
    }
    
} catch (error) {
    console.log("✗ Error validating HTML structure:", error.message);
}

console.log("\n=== Test Runner Complete ===");
console.log("Basic validation completed. For full browser-based testing, open test-runner.html");