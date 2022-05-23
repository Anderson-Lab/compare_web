from django.test import TestCase
import requests
import django.http as request

# Create your tests here.
class YourTestClass(TestCase):
    @classmethod
    def setUpTestData(cls):
        print("setUpTestData: Run once to set up non-modified data for all class methods.")
        pass

    def setUp(self):
        print("setUp: Run once for every test method to setup clean data.")
        pass

    def test_false_is_false(self):
        print("Method: test_false_is_false.")
        self.assertFalse(False)

    def test_false_is_true(self):
        print("Method: test_false_is_true.")
        self.assertTrue(False)

    def test_one_plus_one_equals_two(self):
        response = self.client.post('http://'+ request.path +':7012/crisprstreamline')
        self.assertRedirects(response, '/posts/', status_code=200,
                                  target_status_code=200)
    def test_fasta(self):
        referenceChromosome = '22'
        referenceGenome = 'hg19'
        fastaFile = 'E:/flashfry/EMX1_GAGTCCGAGCAGAAGAAGAAGGG.fasta'
        r = requests.get('http://'+ request.path +':7011/crisprstreamlineapi/create_streamline_job')
        print(r.json())
    #
    # def test_update_password_view(self):
    #     credentials = {
    #         'old_password': '123secret',
    #         'password1': '321secret',
    #         'password2': '321secret',
    #     }
    #     response = self.client.post('http://127.0.0.1:8000/users/change-password/',
    #                                 credentials, follow=True)
    #     self.assertRedirects(response, '/posts/', status_code=200,
    #                          target_status_code=200)
    #
    # def test_check_threads_content_is_correct(self):
    #     threads_page = self.client.get('/threads/1/')
    #     self.assertEqual(threads_page.status_code, 200)