<script>
  // -----------------------------
  // Component state variables
  // -----------------------------
  let result = null;  // Holds the API response after submission
  let loading = false; // Tracks whether the form is submitting
  let error = null;   // Stores any error message from the API call

  // -----------------------------
  // Applicant data
  // -----------------------------
  let applicant = {
    name_first: "Jessica",
    name_last: "Review",
    birth_date: "1990-05-12",
    ssn: "123456789",
    email_address: "jessica.review@example.com",
    address_line_1: "123 Main Street",
    address_city: "New York",
    address_state: "NY",
    address_postal_code: "10001",
    address_country_code: "US"
  };

  // -----------------------------
  // Submit function
  // -----------------------------
  async function submit() {
    loading = true;   // Start loading spinner
    error = null;     // Clear previous errors
    result = null;    // Clear previous results

    try {
      // Send POST request to backend API
      const res = await fetch("api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicant), // Send applicant object as JSON
      });

      // Throw error if server response is not OK
      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      // Parse JSON response
      result = await res.json();
    } catch (err) {
      // Catch and store error message
      error = err.message;
    } finally {
      // Stop loading spinner
      loading = false;
    }
  }
</script>

<main>
  <h1>Alloy Sandbox Evaluation</h1>

  <!-- Submit button with loading state -->
  <button on:click={submit} disabled={loading}>
    {loading ? "Submitting..." : "Submit to Alloy"}
  </button>

  <!-- Dropdown to update applicant's last name dynamically -->
  <label for="lastName">Applicant Last Name:</label>
  <select id="lastName" bind:value={applicant.name_last}>
    <option value="Approved">Approved</option>
    <option value="Review">Review</option>
    <option value="Deny">Deny</option>
  </select>

  <!-- Display error message if any -->
  {#if error}
    <p style="color:red;">Error: {error}</p>
  {/if}

  <!-- Display results if available -->
  {#if result}
    <h2>Response Summary</h2>
    <!-- Result box with dynamic class based on outcome -->
    <div class="result-box {result.summary?.outcome?.toLowerCase()}">
      <h2>{result.summary?.outcome}</h2>

      <!-- Display a friendly message based on the outcome -->
      {#if result.summary?.outcome === 'Approved'}
        <p>The applicant has been approved!</p>
      {:else if result.summary?.outcome === 'Manual Review'}
        <p>Thanks for submitting your application, we’ll be in touch shortly.</p>
      {:else if result.summary?.outcome === 'Denied'}
        <p>Sorry, your application was not successful.</p>
      {/if}
    </div>

    <!-- Optional: show full JSON response for debugging -->
    <details>
      <summary>View full JSON</summary>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </details>
  {/if}
</main>

<style>
  /* -----------------------------
     Main styling
  ----------------------------- */
  main {
    font-family: system-ui, sans-serif;
    padding: 2rem;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }

  /* -----------------------------
     Result box styling
     The class is dynamically set based on the outcome:
     e.g., "approved", "manual review", "denied"
  ----------------------------- */
  .result-box {
    margin-top: 1rem;
    padding: 1.5rem;
    border-radius: 8px;
    color: white;
    text-align: center;
    font-size: 1.25rem;
  }
</style>