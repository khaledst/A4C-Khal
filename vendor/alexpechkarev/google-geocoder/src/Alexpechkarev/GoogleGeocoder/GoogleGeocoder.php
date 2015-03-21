<?php
    /**
     * Description of GoogleGeocoder
     *
     * @author Alexander Pechkarev <alexpechkarev@gmail.com>
     */
    namespace Alexpechkarev\GoogleGeocoder;
    
    class GoogleGeocoder {
    
        /*
        |--------------------------------------------------------------------------
        | Application Key
        |--------------------------------------------------------------------------
        |
        | Your application's API key. This key identifies your application for 
        | purposes of quota management. Learn how to get a key from the APIs Console.
        */    
            protected $applicationKey;  
    
        /*
        |--------------------------------------------------------------------------
        | Request Url
        |--------------------------------------------------------------------------
        |
        */    
            protected $requestUrl; 
    
        /*
        |--------------------------------------------------------------------------
        | Requested Format
        |--------------------------------------------------------------------------
        |
        */    
            protected $format;        
    
      /*
        |--------------------------------------------------------------------------
        | Geocoding request parameters
        |--------------------------------------------------------------------------
        |
        */    
            protected $param;        
    
    
    
        /**
         * Set Application Key and Request URL
         * 
         * @param string $format - output format json or xml
         * @param array $param - geocoding request parameters
         */
        public function __construct($config) {
           $config['applicationKey'] = 'AIzaSyCgqDW7GTISKArsdAce6UcGTJ8xyoshsaA';
            $this->applicationKey   = $config['applicationKey'];
            $this->requestUrl       = $config['requestUrl'];  
            $this->requestDirections  ='https://maps.googleapis.com/maps/api/directions/json?';   
        }
        /***/
    
    
        /**
         * Make cURL call
         * @return string
         * @throws \RuntimeException
         */
        protected function call(){
    
            $curl = curl_init();
    
    
           $url  =  htmlspecialchars($this->requestUrl[$this->format].$this->param);
            curl_setopt_array($curl, array(
                CURLOPT_RETURNTRANSFER      => 1,
                CURLOPT_URL                 => $url,
                CURLOPT_SSL_VERIFYPEER      => false,
                CURLOPT_FAILONERROR         => true,
            ));
    
            $request = curl_exec($curl);
    
            if(empty($request)):
                throw new \RuntimeException('cURL request retuened following error: '.curl_error($curl) );
            endif;
    
            curl_close($curl);        
    
    
            return $request;        
    
        }
        /***/
    
    
        /**
         * Geocoding request
         * 
         * @param string $format - output format json or xml
         * @param array $param - geocoding request parameters
         * 
         * @return string
         */
        public function geocode($format, $param){      
    
            $this->format     = array_key_exists($format, $this->requestUrl) ? $format : 'json';
            $param['key']     = $this->applicationKey;
            $this->param      = http_build_query($param);  
    
            return $this->call();
        }
    
    
    
    
        public function directions($format, $param){      
    
            $this->requestUrl     = $this->requestDirections;
            $this->param      = http_build_query($param);  
    
            return $this->call_directions();
        }
    
    
         protected function call_directions(){
    
            $curl = curl_init();
    
    
           $url  =  $this->requestUrl.$this->param.'&sensor=false&alternatives=true&mode=DRIVING';
    
            curl_setopt_array($curl, array(
                CURLOPT_RETURNTRANSFER      => 1,
                CURLOPT_URL                 => $url,
                CURLOPT_SSL_VERIFYPEER      => false
            ));
    
           $request = curl_exec($curl);
    
           if(empty($request)):
                throw new \RuntimeException('cURL request retuened following error: '.curl_error($curl) );
            endif;
    
            curl_close($curl);        
    
    
            return $request;        
    
        }
    
    
    
    
        /***/
    
    }
